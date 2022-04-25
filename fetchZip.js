import { unzip1 } from "./unzip1.js";

export const fetchZip = async (url) => {
  const bin = new Uint8Array(await (await fetch(url)).arrayBuffer());
  if (url.endsWith(".zip")) {
    return unzip1(bin);
  }
  return bin;
};
