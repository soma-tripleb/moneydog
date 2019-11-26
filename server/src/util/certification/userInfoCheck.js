const checkedPasswordForm = (password) => {
  const num = password.search(/[0-9]/g);
  const eng = password.search(/[a-z]/ig);
  const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (password.length < 8 || password.length > 20) {
    return '8자리 ~ 20자리 이내로 입력해주세요.';
  }

  if (password.search(/\s/) !== -1) {
    return '비밀번호는 공백업이 입력해주세요.';
  }

  if (num < 0 || eng < 0 || spe < 0) {
    return '영문,숫자, 특수문자를 혼합하여 입력해주세요.';
  }

  return true;
};

export {
  checkedPasswordForm,
};
