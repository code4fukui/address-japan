const endpoint = "https://registry-catalog.registries.digital.go.jp/api/3/";

const limit = 1000;

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
// https://registry-catalog.registries.digital.go.jp/api/3/action/group_list
const listGroup = async () => {
  return api("action/group_list", { limit });
};
// https://registry-catalog.registries.digital.go.jp/api/3/action/group_show?id=g1-000304
const showGroup = async (gid) => {
  return api("action/group_show", { id: gid });
};
// https://registry-catalog.registries.digital.go.jp/api/3/action/group_package_show?id=g2-000002
const listDatasetByGroup = async (gid) => {
  return api("action/group_package_show", { id: gid, limit });
};
const parseResourceURL = (d) => {
  return d.resources.find(d => !d.url.endsWith(".metadata.csv")).url;
};

export const CKAN = {
  api,
  searchDataset,
  showDataset,
  listGroup,
  showGroup,
  listDatasetByGroup,
  parseResourceURL,
};
