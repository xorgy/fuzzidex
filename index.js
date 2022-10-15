const vary_ident = x => [x];

export const mkgrams = (s, depth = 6) => {
  return mkgrams_vary(vary_ident, s, depth);
};

export const mkgrams_vary = (varier, s, depth = 6) => {
  const gs = new Set();
  for (const variant of varier(s)) {
    const norm = variant.normalize("NFD");
    const len = norm.length;
    const rdepth = Math.min(depth, len);
    for (let i = 0; i < len; i++)
      for (let j = 0; j < rdepth; j++)
        gs.add(norm.substring(i, i + j + 1))
  }
  return gs;
};

export const insert = (index = {}, key, index_string, depth = 6) => insert_vary(vary_ident, index, key, index_string, depth);

export const insert_vary = (varier, index = {}, key, index_string, depth = 6) => {
  const gs = mkgrams_vary(varier, index_string, depth);
  for (const gram of gs) {
    if (!(gram in index))
      index[gram] = [];
    if (index[gram].indexOf(key) === -1)
      index[gram].push(key);
  }
  return index;
}

export const query = (index, query_string, depth = 6) => query_vary(vary_ident, index, query_string, depth);

export const query_vary = (varier, index, query_string, depth = 6) => {
  const gs = mkgrams_vary(varier, query_string, depth);
  const outmap = new Map();
  for (const gram of gs)
    if (gram in index)
      for (const k of index[gram])
        outmap.set(k, (outmap.get(k) | 0) + 1)
  return outmap;
};

export const covary = (vsi, variers) => {
  const vs = new Set(vsi);
  for (const s of [...vs])
    for (const varier of variers)
      for (const variant of varier(s)) {
        vs.add(variant);
        for (const varier2 of variers.filter(x => x !== varier))
          for (const variant2 of varier2(variant))
            vs.add(variant2);
      }
  return vs
}

export const vary_obvious = s => covary([s, `\x02${s}\x03`], [
  x => [x.normalize("NFKD")],
  x => [x.toLowerCase()],
  x => [x.replace(/\s/gu, '')],     // without whitespace
  x => [x.replace(/\p{P}/gu, '')],  // without punctuation
  x => [x.replace(/\p{Sc}/gu, '')], // without currency symbols
]);

export class InvertIndex {
  constructor ({depth, varier} = {}) {
    this.idx = {};
    this.depth = 6;
    this.varier = vary_obvious;

    if (depth) this.depth = depth;
    if (varier) this.varier = varier;
  }

  insert(k, index_string) {
    insert_vary(this.varier, this.idx, k, index_string, this.depth);
  }

  query(query_string) {
    return query_vary(this.varier, this.idx, query_string, this.depth);
  }
}
