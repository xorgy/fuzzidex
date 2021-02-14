export const mkgrams = (s, depth = 6) => {
  const gs = new Set();
  const norm = s.normalize("NFD").toLowerCase();
  const len = norm.length;
  const rdepth = Math.min(depth, len);
  for (let i = 0; i < len; i++)
    for (let j = 0; j < rdepth; j++)
      gs.add(norm.substring(i, i + j + 1))
  return gs;
};

export const insert = (index = {}, key, index_string, depth = 6) => {
  const gs = mkgrams(index_string);
  for (const gram of gs) {
    if (!(gram in index))
      index[gram] = [];
    if (index[gram].indexOf(key) === -1)
      index[gram].push(key);
  }
  return index;
}

export const query = (index, query_string, depth = 6) => {
  const gs = mkgrams(query_string);
  const outmap = new Map();
  for (const gram of gs)
    if (gram in index)
      for (const k of index[gram])
        outmap.set(k, (outmap.get(k) | 0) + 1)
  return outmap;
};
