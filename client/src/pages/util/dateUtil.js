const NOW = () => {
  const nowDate =
    new Date().toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '')
      .split(' ');

  return nowDate[0]
    .replace(/-/gi, '/');
};

export default {
  NOW,
};
