import { unzip1 } from "./unzip1.js";

const url = "http://gov-csv-export-public.s3.ap-northeast-1.amazonaws.com/mt_pref/mt_pref_all.csv.zip";
const bin = unzip1(new Uint8Array(await (await fetch(url)).arrayBuffer()));
const txt = new TextDecoder().decode(bin);
const csv = CSV.decode(txt);
const json = CSV.toJSON(csv);
console.log(json);
