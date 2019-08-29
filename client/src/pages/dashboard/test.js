const calDate = (renewal) => {
  const result = new Date(renewal) - new Date(new Date().toISOString().slice(0, 10));
  return result;
}
const temp = calDate("2019-09-25");
console.log(temp);
