const test_name = `1개월 이용권 (왓챠플레이)`;
const test_date = `주문 번호:  GPA.3303-9400-7953-78210

주문 날짜:  2019. 8. 9 오후 2시 51분 28초`;

const test_date2 = `주문 번호:  GPA.3303-9400-7953-78210

주문 날짜:  2019. 12. 12 오후 2시 51분 28초`;
const test_duration = `월간 구독 ‐ 자동 갱신 날짜: 2019. 9. 9.`;
const date_reg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
const name_reg = /\(([^)]+)\)/;
const duration_reg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/;


const day1 =date_reg.exec(test_date)[0];
const day2 = duration_reg.exec(test_duration)[0];
