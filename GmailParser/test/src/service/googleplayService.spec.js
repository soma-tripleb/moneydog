import should from 'should';

describe.only('GooglePlayService 는', () => {
  describe('파싱한 결과를 DB에 저장할 때', () => {

    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [1, 2, 3, 4, 5];
    const arr3 = [];

    it('같은 서비스가 존재하는지 확인한다.', () => {

      const result = new Set();

      console.log(arr1.size);

      arr1.some((elem) => {
        if (result.has(elem)) {
          return false;
        } else result.add(elem);
      });

      const result3 = arr2.forEach((elem) => {
        console.log(elem);
      });

      const result2 = arr3.some((elem) => {
        console.log(elem);
        return true;
      });

      console.log(result);
      console.log(result3);
    });

  });
});