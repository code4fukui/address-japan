import { CSV } from "https://js.sabae.cc/CSV.js";

const pref = CSV.toJSON(await CSV.fetch("data/pref.csv"));
const city = CSV.toJSON(await CSV.fetch("data/city.csv"));
const list = [];
pref.forEach(d => list.push(d));
city.forEach(d => list.push(d));
list.sort((a, b) => a.全国地方公共団体コード.localeCompare(b.全国地方公共団体コード));
await Deno.writeTextFile("data/lgcode.csv", CSV.stringify(list));
