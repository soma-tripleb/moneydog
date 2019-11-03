
/**
 * 'body1' 개행문자가 있는 데이터(non-forward)
 */
const GooglePlayParser2 = (() => {
  return {
    body1Parser: (body1) => {
      const text = body1;

      const indexing = text.split(`\r\n`);

      const renewal = indexing[20];
      const total = indexing[24];
      const service = indexing[52];

      return {
        renewal,
        total,
        service
      };
    }
  };
})();

export default GooglePlayParser2;