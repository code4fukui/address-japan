import { CSV } from "https://js.sabae.cc/CSV.js";
import { CKAN } from "./CKAN.js";
import { fetchZip } from "./fetchZip.js";
import { makeDirs } from "./makeDirs.js";

const json = CSV.toJSON(await CSV.fetch("data/pref.csv"));
console.log(json);
/*
{
    "全国地方公共団体コード": "470007",
    "都道府県名": "沖縄県",
    "都道府県名_カナ": "オキナワケン",
    "都道府県名_英字": "Okinawa",
    "効力発生日": "1947-04-17",
    "廃止日": "",
    "備考": ""
  }
*/
const getResourceURL = (d) => {
  return d.resources.find(d => !d.url.endsWith(".metadata.csv")).url;
};
const getResourceURLFromResult = (res, name) => {
  const d = res.result.results.find(d => d.title.indexOf(name) >= 0);
  return getResourceURL(d);
};
const downloadCSV = async (pcode, fn, gid) => {
  const p = await CKAN.showDataset(`o1-${pcode}_g2-${gid}`); // 市区町村マスター
  const cityurl = getResourceURL(p.result);
  const bin = await fetchZip(cityurl);
  await Deno.writeFile(makeDirs(`data/${pcode}/${fn}.csv`), bin);
};
for (const pref of json) {
  const pcode = pref.全国地方公共団体コード;
  /*
  const name = pref.都道府県名;
  const p = await CKAN.searchDataset(name);
  console.log(p);
  const cityurl = getResourceURLFromResult(p, "市区町村マスター");
  */
  await downloadCSV(pcode, "city", "000002");
  await downloadCSV(pcode, "town", "000003");
}
