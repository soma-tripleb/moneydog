#!/bin/bash
# caution
echo '#versioning'
echo '`S3` 저장소에 올려 놓은 version.txt 파일을 읽어서 버전 확인 후 파일을 업데이트'

# bash shell checker
echo '현재 OS: ' $SHELL

# s3 에서 version.txt 파일 읽어오기
dir=dist

if [ ! -d $dir ]; then
    mkdir -m 755 $PWD/$dir
fi

curl "https://moneydog.s3.ap-northeast-2.amazonaws.com/build/version.txt" > ./dist/version.txt

# version.txt
while read line
do
  VERSION=$line

  VERSION_NUM=${VERSION//[^0-9]}
  NEXT_VERSION_NUM=`expr $VERSION_NUM + 1`

  NEXT_VERSION=${NEXT_VERSION_NUM:0:1}\.${NEXT_VERSION_NUM:1:1}\.${NEXT_VERSION_NUM:2}

  sed -i -e 's/'${VERSION}'/'${NEXT_VERSION}'/' "$PWD/dist/version.txt"

done < $PWD/dist/version.txt

echo -e "CURRENT_VERSION\t: $VERSION"
echo -e "NEXT_VERSION\t: $NEXT_VERSION"

# package.json
keyword1="\"version\""

while read line
do
  key=${line%%: *}
  value=${line##* }

  if [ "${keyword1}" == "${key}" ];then
    result=${VERSION//[^0-9]}

    next=`expr $result + 1`
    next_version=\"${next:0:1}\.${next:1:1}\.${next:2}\"\,

    sed -i -e 's/'${value}'/'${next_version}'/' "$PWD/package.json"
    break;
  fi
done < $PWD/package.json
echo -e "version\t\t:" $next_version | tr -d '",'

# webpack.config.js
keyword2="app.jsx"

while read line
do
  if [[ "$line" == *"${keyword2}"* ]];then
    key=${line%%: *}
    value=${line##* }

    next_app=\'${next:0:1}\.${next:1:1}\.${next:2}\.app.jsx\'
    sed -i -e 's/'${value}'/'${next_app}'/' "$PWD/webpack.config.js"
    break;
  fi
done < $PWD/webpack.config.js
echo -e "filename\t:" $next_app | tr -d "\'"

# index.html
keyword3="app.jsx"

while read line
do
  if [[ "$line" == *"${keyword3}"* ]];then

    next_version=${next:0:1}\.${next:1:1}\.${next:2}\.

    dev_path="\.\.\/app\.jsx"
    prod_path="https:\/\/moneydog.s3.ap-northeast-2.amazonaws.com\/build\/"
    prod_path=$prod_path$next_version
    prod_path=$prod_path"app.jsx"

    sed -i -e 's/'${dev_path}'/'${prod_path}'/g' "$PWD/index.html"
  fi
done < $PWD/index.html
echo -e "index.html\t:" $prod_path
