![MDheader](https://user-images.githubusercontent.com/20623970/70880788-9bdf7c80-200d-11ea-9c32-c3d8ab249cf1.png)

---


###  서비스 개요 
머니독은 구독 서비스를 한눈에 보여주고, 저렴하게 이용하는 방법 제안을 통해 경제적인 구독 서비스를 제안하는 서비스입니다.

### 구독 서비스란 ?
'구독'은 소비자가 특정 서비스를 이용하기 위해 정기적으로 지불하는 방식의 비즈니스 모델. 
음악, 명상, 책, 동영상 스트리밍 등 다양한 분야에서 구독 분야 서비스가 확장 되고 있다.

### 서비스를 필요로 하는 사람들 

1. 구독 서비스를 이용하는 사람
2. 구독서비스 비용을 자신도 모르게 지출 된 경험을 한 사람
3. 구독 서비스의 결제일 및 결제 가격을 모르는 사람

### 해결책 - 머니독의 가치
 
1. 구독 서비스를 한 곳에서 관리하자.
2. 사람들에게 재결제일을 미리 알려주자.
3. 구독 서비스를 등록하기 편하게 하자.

# 화면 구성도
### 시작하기
서비스의 주요 기능과 사용방법을 간단히 안내하고 머니독이 어떤 서비스인지 한는에 알 수 있도록 도와주는 서비스 입니다.
SNS 계정을 통한 가입방법과 개인 계정을 만들어 접속하는 것으로 시작할 수 있습니다.

![main1](https://user-images.githubusercontent.com/20623970/70880787-9bdf7c80-200d-11ea-9172-05ad8c184006.png)

### 구독 서비스 등록하기
회원가입 이후 구독서비스를 수동으로 등록 하는 페이지입니다. 사용자는 자신의 구독 서비스에 대한 결제일 결제가격 등의 정보를 추가합나디. 

![subsManage1](https://user-images.githubusercontent.com/20623970/70880790-9c781300-200d-11ea-812b-81cce323de2f.png)

### 구독 서비스 정보 보기
등록한 구독 서비스를 한눈에 관리 할 수 있는 페이지 입니다. 구독서비스의 전체적인 가격과 세세한 정보들 및 사용자의 구독 히스토리를 관리 할 수 있습니다.

![subsManage2](https://user-images.githubusercontent.com/20623970/70880791-9c781300-200d-11ea-9225-ce09bceb0d26.png)

### 알림 보내기 
리포트 페이지를 정기적으로 또는 버튼 클릭시 사용자의 메일로 보내드립니다.
 
![subsManage3](https://user-images.githubusercontent.com/20623970/70880792-9c781300-200d-11ea-85fb-495bd7a2fb25.png)

### 스캔하기
사용자가 리다이렉션 되는 구글 로그인시 자동으로 구글 이메일 영수증 목록을 스캔 합니다. 서비스는 자동으로 사용자의 구독 리스트를 추가 해줍니다.

![subsManage4](https://user-images.githubusercontent.com/20623970/70880793-9c781300-200d-11ea-83b3-e46c15696025.png)

# 시스템 구성도
### Site Map
사용자가 머니독 서비스를 사용하는 순서도
<img width="1267" alt="subsManage5" src="https://user-images.githubusercontent.com/20623970/70880812-b0237980-200d-11ea-99bf-aba2057c2efb.png">

### Service Architecture
사용자가 서비스를 사용하는 내부 아키텩쳐
![serviceArctecture](https://user-images.githubusercontent.com/20623970/70880789-9bdf7c80-200d-11ea-85bd-7dff96bd4516.png)

사용 기술 : ReactJS / NodeJS / MongoDB / GoogleAPI

### Google Mail Sacn Process
Google Mail 영수증이 크롤링 되어서 데이터베이스에 저장 되는 과정
![googleSacn](https://user-images.githubusercontent.com/20623970/70880786-9b46e600-200d-11ea-9f89-40faf6d740fe.png)

사용 기술 : Gmail API / Crawling / RegExp / String parsing / Google OAuth

### CI/CD & Deploy Process
moneydog 서비스가 Git circle CI 를 통해 빌드 및 배포 되는 과정
![deployProcess](https://user-images.githubusercontent.com/20623970/70880784-9b46e600-200d-11ea-8b66-3ef013062921.png)

사용 기술 : AWS S3 / AWS ECS / AWS ECR / AWS CloudWatch / Circle CI / Slack  

