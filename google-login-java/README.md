# Google OAuth API
* 구글 로그인
* Gmail 접근 권한
* Gmail 보기(영수증 정보)

## Project Run
IntelliJ 기준

> IDE 실행 후, 'Import Project' 로 project open

## API Doc
> 프로젝트 빌드 후 'https://localhost:8090/swagger-ui.html' 에서 확인

* '[host:port]/message/**' 관련 API 만 명세 해 놓았다.
* '{query}' 는 Gmail에서 메일 검색 관련 키워드. (ex, 'apple'에서 온 메일 검색 시 'from:no_reply@email.apple.com' 키워드 입력) 

## Refresh Token
* 사용자의 Gmail API 에 접근 하기 위한 access_token 값은 만료된다.
* Google 의 authurization server에 최초 접근 했을 때 발급 바는 Refresh Token 으로 다시 access_token 값을 발급 받는다.

참고
* [google api document](https://googleapis.dev/java/google-api-client/latest/index.html)