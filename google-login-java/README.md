# Google OAuth API
* 구글 로그인
* Gmail 접근 권한
* Gmail 보기(영수증 정보)

## Project Run
IntelliJ 기준

> IDE 실행 후, 'Import Project' 로 project open

## Refresh Token
* 사용자의 Gmail API 에 접근 하기 위한 access_token 값은 만료된다.
* Google 의 authurization server에 최초 접근 했을 때 발급 바는 Refresh Token 으로 다시 access_token 값을 발급 받는다.

참고
* [google api document](https://googleapis.dev/java/google-api-client/latest/index.html)