import { CSV } from "https://js.sabae.cc/CSV.js";

const zenkana1 = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョー゛゜。、「」";
const zenkana2 = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴ";
export const isKana = (s) => zenkana1.indexOf(s) >= 0 || zenkana2.indexOf(s) >= 0;

const num1 = "0123456789";
const num2 = "０１２３４５６７８９";
export const isNumber = (s) => num1.indexOf(s) >= 0 || num2.indexOf(s) >= 0;

const pref = CSV.toJSON(await CSV.fetch("data/pref.csv"));

const towns = []
for (const p of pref) {
  const pcode = p.全国地方公共団体コード;
  const town = CSV.toJSON(await CSV.fetch(`data/${pcode}/town.csv`));
  town.forEach(t => towns.push(t));
};
console.log(towns.length); // 739161
console.log(towns[0]);

const key = (t) => {
  const s = t["大字・町名_カナ"] + t["丁目名_カナ"] + t["小字名_カナ"];
  if (s == "") {
    return "ン1"; // null?
  }
  if (isNumber(s[0])) {
    return "ン2"; // number
  }
  if (!isKana(s[0])) {
    return "ン3"; // not kana
  }
  return s;
};

const keyAlpha = (t) => {
  const s = t["大字・町名_英字"] + t["小字名_英字"];
  if (s == "") {
    return ""; // null?
  }
  if (isNumber(s[0])) {
    return "ZZ2"; // number
  }
  /*
  if (!isKana(s[0])) {
    return "3"; // not kana
  }
  */
  return s;
};

const show = (t) => t.都道府県名 + " " + t.市区町村名 + " " + t["大字・町名"] + " " + t["丁目名"] + " " + t["小字名"] + " " + t.市区町村名 + " " + key(t);

const inspectKanaOrder = async () => {
  towns.sort((a, b) => key(a).localeCompare(key(b)));
  console.log(towns.slice(0, 5));
  console.log(towns.slice(0, 99).map(show));
  const order = towns.slice(0, 99);
  await Deno.writeTextFile("data/towns-kana-order.csv", CSV.stringify(order));
};

/*
    "都道府県名": "福島県",
    "都道府県名_カナ": "フクシマケン",
    "都道府県名_英字": "Fukushima",
    "郡名": "南会津郡",
    "郡名_カナ": "ミナミアイヅグン",
    "郡名_英字": "Minamiaizu-gun",
    "市区町村名": "檜枝岐村",
    "市区町村名_カナ": "ヒノエマタムラ",
    "市区町村名_英字": "Hinoemata-mura",
    "政令市区名": "",
    "政令市区名_カナ": "",
    "政令市区名_英字": "",
    "大字・町名": "",
    "大字・町名_カナ": "",
    "大字・町名_英字": "",
    "丁目名": "",
    "丁目名_カナ": "",
    "丁目名_数字": "",
    "小字名": "（十字路）",
    "小字名_カナ": "（ジュウジロ）",

    "都道府県名": "富山県",
    "市区町村名": "高岡市",
    "市区町村名_カナ": "タカオカシ",
    "市区町村名_英字": "Takaoka-shi",
    "政令市区名": "",
    "政令市区名_カナ": "",
    "政令市区名_英字": "",
    "大字・町名": "ＩＣパーク",
    "大字・町名_カナ": "ＩＣパーク",
    "大字・町名_英字": "Aishipaku",
*/
const inspectKana = () => {
  //const list = towns.filter(t => key(t) == "ン3"); // 2件
  const list = towns.filter(t => key(t) == ""); //
  console.log(list.map(show), list.length);
};

const inspectAlpha = () => {
  //const list = towns.filter(t => key(t) == "ン3"); // 2件
  const list = towns.filter(t => keyAlpha(t) == "");
  console.log(list.map(show), list.length);
};

await inspectKanaOrder(); 
//inspectKana(); // 2件カナじゃない地名あり、多治見市に57件カナなしあり
//inspectAlpha(); // 英字がないもの 176737件 23.9% (総数739161)

