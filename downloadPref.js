import { fetchZip } from "./fetchZip.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const prefurl = "http://gov-csv-export-public.s3.ap-northeast-1.amazonaws.com/mt_pref/mt_pref_all.csv.zip";

const bin = await fetchZip(prefurl);
await Deno.writeFile("data/pref.csv", bin);
const txt = new TextDecoder().decode(bin);
const json = CSV.toJSON(CSV.decode(txt));
console.log(json);
