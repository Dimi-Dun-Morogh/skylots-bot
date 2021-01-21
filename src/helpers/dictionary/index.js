const months = {
  дек: 'dec',
  янв: 'jan',
  фев: 'feb',
  мар: 'mar',
  апр: 'apr',
  май: 'may',
  июн: 'jun',
  июл: 'jul',
  авг: 'aug',
  сен: 'sep',
  окт: 'oct',
  ноя: 'nov',
  гру: 'dec',
  січ: 'jan',
  лют: 'feb',
  бер: 'mar',
  кві: 'apr',
  тра: 'may',
  чер: 'jun',
  лип: 'jul',
  сер: 'aug',
  вер: 'sep',
  жов: 'oct',
  лис: 'nov',
};

const textToEmoji = (val, count = 1) => {
  const dictionary = {
    0: '0\ufe0f\u20e3',
    1: '1\ufe0f\u20e3',
    2: '2\ufe0f\u20e3',
    3: '3\ufe0f\u20e3',
    4: '4\ufe0f\u20e3',
    5: '5\ufe0f\u20e3',
    6: '6\ufe0f\u20e3',
    7: '7\ufe0f\u20e3',
    8: '8\ufe0f\u20e3',
    9: '9\ufe0f\u20e3',
    saintsRow: '\u269c\ufe0f',
    info: '\u2139\ufe0f',
    speech: '\ud83d\udcac',
    small_triangle: '\ud83d\udd39',
    lightning: '\u26a1\ufe0f',
    pin: '\ud83d\udccc',
    boom: '\ud83d\udca5',
    pin2: '\ud83e\uddf7',
    green_snowflake: '\u2733\ufe0f',
  };
  let res = '';
  val = String(val);
  if (isNaN(+val)) {
    let resEmoji = '';
    for (let i = count; i > 0; i -= 1) {
      resEmoji += dictionary[val];
    }
    console.log(resEmoji);
    return resEmoji;
  }
  if (val === '10') return '\ud83d\udd1f';
  for (let i = 0; i < val.length; i++) {
    res += dictionary[val[i]];
  }
  return res;
};

module.exports = {
  months,
  textToEmoji,
};
