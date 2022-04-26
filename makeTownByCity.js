import { CSV } from "https://js.sabae.cc/CSV.js";
import { makeDirs} from "./makeDirs.js";

const pref = CSV.toJSON(await CSV.fetch("data/pref.csv"));

for (const p of pref) {
  const pcode = p.全国地方公共団体コード;
  const city = CSV.toJSON(await CSV.fetch(`data/${pcode}/city.csv`));
  const town = CSV.toJSON(await CSV.fetch(`data/${pcode}/town.csv`));
  for (const c of city) {
    const ccode = c.全国地方公共団体コード;
    console.log(c);
    console.log(pcode);
    const ctown = town.filter(t => t.市区町村名 == c.市区町村名 && t.政令市区名 == c.政令市区名);
    ctown.forEach(c => {
      //全国地方公共団体コード,町字id,町字区分コード,都道府県名,都道府県名_カナ,都道府県名_英字,郡名,郡名_カナ,郡名_英字,市区町村名,市区町村名_カナ,市区町村名_英字,政令市区名,政令市区名_カナ,政令市区名_英字,大字・町名,大字・町名_カナ,大字・町名_英字,丁目名,丁目名_カナ,丁目名_数字,小字名,小字名_カナ,小字名_英字,住居表示フラグ,住居表示方式コード,大字・町_通称フラグ,小字_通称フラグ,大字・町外字フラグ,小字外字フラグ,状態フラグ,起番フラグ,効力発生日,廃止日,原典資料コード,郵便番号,備考
      const del = "全国地方公共団体コード,都道府県名,都道府県名_カナ,都道府県名_英字,郡名,郡名_カナ,郡名_英字,市区町村名,市区町村名_カナ,市区町村名_英字,政令市区名,政令市区名_カナ,政令市区名_英字".split(",");
      for (const d of del) {
        delete c[d];
      }
    });
    await Deno.writeTextFile(makeDirs(`data/${pcode}/${ccode}/town.csv`), CSV.stringify(ctown));
  }
}

