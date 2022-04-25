import { fetchZip } from "./fetchZip.js";

const list = [
  { name: "pref", url: "http://gov-csv-export-public.s3.ap-northeast-1.amazonaws.com/mt_pref/mt_pref_all.csv.zip" },
  { name: "city", url: "https://gov-csv-export-public.s3.ap-northeast-1.amazonaws.com/mt_city/mt_city_all.csv.zip" },
  { name: "town", url: "https://gov-csv-export-public.s3.ap-northeast-1.amazonaws.com/mt_town/mt_town_all.csv.zip" },
];

for (const l of list) {
  const bin = await fetchZip(l.url);
  await Deno.writeFile("data/" + l.name + ".csv", bin);
}
