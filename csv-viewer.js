import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import IMIMojiConverter from "https://code4sabae.github.io/imi-moji-converter-es/IMIMojiConverter.mjs";

const std = (s) => IMIMojiConverter.toHalfWidth(s).toLowerCase();

const EMBED_IMAGE = true;
const EMBED_IMAGE_W = 100; // 300;
const EMBED_IMAGE_H = 100; // 225;
const USE_RESIZED_IMAGE = false; // if true, define getResizedImage

const create = (tag) => document.createElement(tag);
const clear = (ele) => ele.innerHTML = "";

const main = async (parent) => {
  const url = parent.getAttribute("src");
  const name = parent.getAttribute("name") || url;

  const csv = await CSV.fetch(url);
  const filter = create("input");
  filter.className = "filter";
  filter.placeholder = "フィルター";
  parent.appendChild(filter);
  const tbl = create("div");
  parent.appendChild(tbl);
  showTable(tbl, csv, filter.value);
  filter.onchange = filter.onkeyup = () => showTable(tbl, csv, filter.value);

  const data = create("div");
  data.innerHTML = `DATA: <a href=${url}>${name}</a>`;
  parent.appendChild(data);
};

const showTable = function (p, csv, sfilter, sortidx, sortorder) {
  sfilter = std(sfilter);
  const array = [];
  array.push(csv[0]);
  if (sfilter.length == 0) {
    for (let i = 1; i < csv.length; i++) {
      array.push(csv[i]);
    }
  } else {
    const afilter = sfilter.split(" ");
    for (let i = 1; i < csv.length; i++) {
      const ar = csv[i];
      let flg = false;
      for (let k = 0; k < afilter.length; k++) {
        const af = afilter[k];
        flg = false;
        for (let j = 0; j < ar.length; j++) {
          if (std(ar[j]).indexOf(af) >= 0) {
            flg = true;
            break;
          }
        }
        if (!flg) {
          break;
        }
      }
      if (flg) {
        array.push(ar);
      }
    }
  }

  const getNumber = function (s) {
    if (s.length == 0) {
      return Math.NaN;
    }
    let i;
    for (i = 0; i < s.length; i++) {
      if ("0123456789.,".indexOf(s.charAt(i)) == -1) {
        break;
      }
    }
    if (i == 0) {
      return Math.NaN;
    }
    return parseFloat(s.substring(0, i).replace(/,/g, ""));
  };

  /*
	console.log(getNumber("") == Math.NaN)
	console.log(getNumber("n/a") == Math.NaN)
	console.log(getNumber("1,500"))
	console.log(getNumber("3.45%"))
	*/
  // nline.textContent = array.length - 1
  if (sortidx != undefined) {
    const head = array[0];
    array.shift();
    const arbk = [];
    for (let i = 0; i < array.length; i++) {
      arbk.push(array[i]);
    }
    array.sort(function (a, b) {
      const an = a[sortidx];
      const bn = b[sortidx];
      let am = 0;
      let bm = 0;
      while (am++) {
        if (arbk[am] == a) {
          break;
        }
      }
      while (bm++) {
        if (arbk[bm] == b) {
          break;
        }
      }
      let flg = 0;
      if (an == bn) {
        flg = sortorder ? am - bm : bm - am;
      } else {
        // cut unit
        const ad = getNumber(an);
        const bd = getNumber(bn);
        if (ad == Math.NaN && bd == Math.NaN) {
          flg = an > bn ? 1 : -1;
        } else if (ad == Math.NaN) {
          flg = -1;
        } else if (bd == Math.NaN) {
          flg = 1;
        } else {
          flg = ad > bd ? 1 : -1;
        }

        /*
				const anv = parseFloat(an);
				const bnv = parseFloat(bn);
				if (an == anv && bn == bnv) {
					flg = anv > bnv ? 1 : -1;
				} else {
					flg = an > bn ? 1 : -1;
				}
				*/
      }
      return flg * (sortorder ? 1 : -1);
    });
    array.splice(0, 0, head);
  }

  const tbl = create("table");

  const tr = create("tr");
  const td = create("th");
  td.textContent = "-";
  tr.appendChild(td);

  const dd = array[0];
  for (let j = 0; j < dd.length; j++) {
    const td = create("th");
    const val = dd[j];
    const lbl = create("span");
    lbl.textContent = val;
    td.appendChild(lbl);
    const up = create("span");
    up.idx = j;
    up.className = "sort";
    up.textContent = "▲";
    up.onclick = function () {
      showTable(p, array, sfilter, this.idx, true);
    };
    td.appendChild(up);
    const down = create("span");
    down.idx = j;
    down.className = "sort";
    down.textContent = "▼";
    down.onclick = function () {
      showTable(p, array, sfilter, this.idx, false);
    };
    td.appendChild(down);
    tr.appendChild(td);
  }
  tbl.appendChild(tr);
  for (let i = 1; i < array.length; i++) {
    const dd = array[i];
    const tr = create("tr");

    const td = create("td");
    td.textContent = i;
    tr.appendChild(td);

    for (let j = 0; j < dd.length; j++) {
      const td = create("td");
      let val = dd[j];
      if (val.startsWith("http://") || val.startsWith("https://")) {
        let s = "";
        val = val.replace(/</g, "&lt;");
        val = val.replace(/>/g, "&gt;");
        //				if (val.toLowerCase().endsWith(".jpg") || val.toLowerCase().endsWith(".png")) {
        if (val.toLowerCase().endsWith(".jpg")) {
          if (EMBED_IMAGE) {
            if (USE_RESIZED_IMAGE) {
              s = "<img src='" +
                getResizedImageURL(val, EMBED_IMAGE_W, EMBED_IMAGE_H) + "'><br>";
              s += "<a href=" + val + ">" + val + "</a>";
            } else {
              s = "<img src='" + val + "'><br>";
              s += "<a href=" + val + ">" + val + "</a>";
            }
          } else {
            s += "<a href=" + val + ">" + val + "</a>";
          }
        } else {
          s += "<a href=" + val + ">" + val + "</a>";
        }
        td.innerHTML = s;
      } else {
        val = val.replace(/</g, "&lt;");
        val = val.replace(/>/g, "&gt;");
        val = val.replace(/\\n/g, "<br>");
        td.innerHTML = val;
      }
      tr.appendChild(td);
    }
    tbl.appendChild(tr);
  }
  clear(p);
  p.appendChild(tbl);
};

class CSVViewer extends HTMLElement {
  constructor(param) {
    super();
    for (const name in param) {
      this.setAttribute(name, param[name]);
    }
    main(this);
  }
}

customElements.define("csv-viewer", CSVViewer);

export { CSVViewer };
