import { unzip } from "https://taisukef.github.io/zlib.js/es/unzip.js";

export const unzip1 = (zip) => {
  const zips = unzip(zip);
  const fns = zips.getFilenames();
  if (fns.length == 0) {
    return null;
  }
  const fn = fns[0];
  return zips.decompress(fn);
};
