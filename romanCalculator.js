function calculator(string) {
  const romansNumerals = { Z: 2000, M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };

  function romanToArabic(str) {
    if (!/^[IVXLCDMZ]+$/.test(str)) throw new Error("Неправильный формат римских цифр");
    return str.split("").reduce(function (r, v, i, arr) {
      const [a, b, c] = [romansNumerals[arr[i]], romansNumerals[arr[i + 1]], romansNumerals[arr[i + 2]]];
      if (b && c && a <= b && b < c) throw new Error("Неправильный формат римских цифр");
      return b > a ? r - a : r + a;
    }, 0);
  }

  function arabicToRoman(num) {
    if (!/^\-?\d+$/.test(num + "")) throw new Error("Невозможно преобразовать в римскую");
    if (num < 1) return "";
    let result = "";
    for (let key in romansNumerals)
      while (num >= romansNumerals[key]) {
        result += key;
        num -= romansNumerals[key];
      }
    return result;
  }

  let wrongСhar = [];

  string = string.replace(/[^IVXLCDMZ\d+\-*\/]/gi, (chr) => {
    if (chr !== " ") wrongСhar.push(chr);
    return "";
  });

  if (wrongСhar.length > 0) throw Error("Символы не допустимы: " + wrongСhar.join(" "));
  let isRoman = /^[IVXLCDMZ]+$/,
    vars = string.split(/[+\-*\/]/),
    action = string.match(/[+\-*\/]/)[0];

  if (vars.length !== 2) throw Error("Должно быть лишь два числа");

  let r = vars.reduce((s, v) => s + isRoman.test(v), 0);
  if (r === 1) throw Error("Оба числа должны быть либо римскими, либо арабскими, исправьте выражение: ");
  else if (r === 2) vars = vars.map((v) => romanToArabic(v));
  else if (vars.reduce((s, v) => s + /^\d+$/.test(v)) < 2) throw Error("Приведенные операнды не допустимы, проверьте выражение: ");

  if (vars.some((v) => v < 1 || v > 10)) throw Error("Допустимо значение операндов лишь от 1 до 10 включительно");

  let result = Math.floor(eval(vars.join(action)));

  return r === 0 ? result.toString() : arabicToRoman(result);
}

calculator();
