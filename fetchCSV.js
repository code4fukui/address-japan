import { CSV } from "https://js.sabae.cc/CSV.js";

export const fetchCSV = async (url) => {
  const bin = await fetchZip(url);
  const txt = new TextDecoder().decode(bin);
  const csv = CSV.decode(txt);
  return csv;
};
