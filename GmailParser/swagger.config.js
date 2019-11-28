/**
 * Created by yhPark on 2019. 11. 28.
 */

export default {
  swaggerDefinition: {
    // 정보
    info: {
      title: 'MoneyDog - Parsing API (Gmail)',
      version: '1.0.0',
      description: 'Gmail에 존재하는 구독 서비스 정보 스캐닝 API'
    },

    // 주소
    host: 'localhost:3000',

    // 기본 root path
    basePath: '/',
    contact: {
      email: 'dudrnxps1@gmail.com'
    },

    // 각 api에서 설명을 기록할 때 사용할 constant들을 미리 등록해놓는것
    components: {
      res: {
        BadRequest: {
          description: '잘못된 요청.',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        },
        Forbidden: {
          description: '권한이 없음.',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        },
        NotFound: {
          description: '없는 리소스 요청.',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        }
      },
      errorResult: {
        Error: {
          type: 'object',
          properties: {
            errMsg: {
              type: 'string',
              description: '에러 메시지 전달.'
            }
          }
        }
      }
    },

    schemes: ['http', 'https'], // 가능한 통신 방식

    // 모델 정의 (User 모델에서 사용되는 속성 정의)
    // definitions:
    // {
    //   'User': {
    //     type: 'object',
    //     properties: {
    //       id: {
    //         type: 'string'
    //       },
    //       age: {
    //         type: 'integer'
    //       },
    //       addr: {
    //         type: 'string'
    //       }
    //     }
    //   }
    // },

  },

  // api 파일 위치들
  apis: ['./src/routes/**/*.js']
};