const endpoint = "https://registry-catalog.registries.digital.go.jp/api/3/";

const api = async (path, param) => {
  const makeParam = () => {
    if (!param) {
      return "";
    }
    const ss = [];
    for (const name in param) {
      ss.push(name + "=" + encodeURIComponent(param[name]));
    }
    return "?" + ss.join("&");
  };
  const url = endpoint + path + makeParam(param);
  return await (await fetch(url)).json();
};
// https://registry-catalog.registries.digital.go.jp/api/3/action/package_search?q=%E7%A6%8F%E4%BA%95%E7%9C%8C
const searchDataset = async (keyword) => {
  return api("action/package_search", { q: keyword });
};
// https://registry-catalog.registries.digital.go.jp/api/3/action/package_show?id=o1-180009_g2-000002
const showDataset = async (id) => {
  return api("action/package_show", { id });
};

export const CKAN = {
  api,
  searchDataset,
  showDataset,
};
