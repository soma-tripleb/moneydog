# Google OAuth 인증을 통한 API 사용

* 용어 정리
  * user : 사용자, 내 웹 혹은 앱을 사용하는 사람.
  * client(클라이언트) : 내가 만들고 있는 사이트 혹은 앱.
  * Google : 사용자의 정보를 가지고 있는 서버, 리소스 저장소.

## _client_secret.json_
Google API Console 페이지에서 프로젝트를 생성하면 받을 수 있는 파일 (**자격증 명 작성> OAuth 클라이언트 ID**).

내가 사용하는 서비스(클라이언트)를 구글에 인증하기 위한 파일, 일종의 증명서.
_'client_id'_ 와 _'client_secret'_ 정보를 가지고 있으므로, 개발 단계에서 소중히 다뤄줘야 하는 파일이다.

이 파일의 정보로 _Google_ 과 내 프로젝트(서비스)와 첫 인증 절차를 거친다.

## API Endpoint
인증이 끝난 후, Google 에서 사용자의 특정 서비스 (예를들어, Gmail / Google Drive / Calander) 를 받아 볼 수 있는 API 게이트(?).

* Gmail Message list - https://www.googleapis.com/gmail/v1/users/[userId]/messages?access_token=
* Gmail Message get - https://www.googleapis.com/gmail/v1/users/[userId]/messages/id?access_token=







