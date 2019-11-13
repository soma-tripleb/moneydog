import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

describe.only('google oauth는', () => {
  describe('google login 으로 받은 `code`를 통해서 refresh_token 받기', () => {

    const code = '4/tAEXxui3nWaCOYHXUvM4NO2z6RDg4d3cQZi8hyDFxx6hTnCtmVHlbQ2uP3kBR8Wdnhm2vbb7THfPQuzyiQAv_vg';
    const ACCESS_TOKEN = 'ya29.Il-wB7a2hq92rCSz5eM7vYbE2UQDhPI0ai8d8oTikmLRycsp7KJCg1kVMnPHZmXqpVRscTjdTYHLUn_1jljEjHjdaDbQVHOTWlQgbf-A5atMtln-VWRB-k926cpZ-KBqnw';
    let REFRESH_TOKEN;

    it('성공 시', async () => {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_API_CLIENT_ID,
        process.env.GOOGLE_API_CLIENT_SECRET,
        'http://localhost:8080',
      );

      try {
        const { tokens } = await oauth2Client.getToken(code);
        const oauth = oauth2Client.setCredentials(tokens);

        console.log(tokens);
      } catch (err) {
        throw err;
      }
    });
  });
});