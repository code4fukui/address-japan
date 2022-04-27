import { fetchZip } from "./fetchZip.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

const prefurl = "http://gov-csv-export-public.s3.ap-northeast-1.amazonaws.com/mt_pref/mt_pref_all.csv.zip";

const bin = await fetchZip(prefurl);
await Deno.writeFile("data/pref.csv", bin);
const txt = new TextDecoder().decode(bin);
const csv = CSV.decode(txt);
const json = CSV.toJSON(csv);
await Deno.writeTextFile("data/pref.json", JSON.stringify(json, null, "\t"));
await Deno.writeTextFile("data/pref.min.json", JSON.stringify(json));
await Deno.writeTextFile("data/pref.csv.json", JSON.stringify(csv));
console.log(json);
await Deno.writeFile("data/pref.csv.cbor", CBOR.encode(csv));
await Deno.writeFile("data/pref.cbor", CBOR.encode(json));
