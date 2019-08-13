# Google OAuth API

1. 구글 로그인 
2. 사용자 Gmail 접근 권한 (readonly)

## Project Run

- IntelliJ

> IDE 실행 후, 'Import Project' 로 프로젝트 open

## API Doc
프로젝트 빌드 후 아래 URL 에서 확인
* 'https://localhost:8090/v4/api-docs'  - 매핑 되어 있는 URL Path 확인 (JSON)
* 'https://localhost:8090/swagger-ui.html'  - 'swagger-ui'

사용법
* '[host:port]/message/**' 관련 API 만 명세 해 놓았다.
* '{query}' 는 Gmail에서 메일 검색 관련 키워드. (ex, 'apple'에서 온 메일 검색 시 'from:no_reply@email.apple.com' 키워드 입력) 



### 관련 용어

#### Refresh Token

* 사용자의 Gmail API 에 접근 하기 위한 access_token 값은 만료된다.
* Google 의 authurization server에 최초 접근 했을 때 발급 바는 Refresh Token 으로 다시 access_token 값을 발급 받는다.



##### 참고

* [google api document](https://googleapis.dev/java/google-api-client/latest/index.html)