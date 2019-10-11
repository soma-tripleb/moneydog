#!/bin/bash

# package.json
keyword1="\"version\""

while read line
do
  key=${line%%: *}
  value=${line##* }

  if [ "${keyword1}" == "${key}" ];then
    result=( ${value//[^0-9]} )

    next=`expr $result + 1`
    next_version=\"${next:0:1}\.${next:1:1}\.${next:2}\"\,

    sed -i -e 's/'${value}'/'${next_version}'/' "$PWD/package.json"
    break;
  fi
done < $PWD/package.json
echo 'version:' $next_version | tr -d '",'

# webpack.config.js
keyword2="app.jsx"

while read line
do
  if [[ "$line" == *"${keyword2}"* ]];then
    key=${line%%: *}   # fliename
    value=${line##* }   # 'version'.app.jsx 

    next_app=\'${next:0:1}\.${next:1:1}\.${next:2}\.app.jsx\'
    sed -i -e 's/'${value}'/'${next_app}'/' "$PWD/webpack.config.js"
    break;
  fi  
done < $PWD/webpack.config.js
echo 'filename:' $next_app