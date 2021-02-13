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

export const insert = (i = {}, k, s, depth = 6) => {
  const gs = mkgrams(s);
  for (const gram of gs) {
    if (!(gram in i))
      i[gram] = [];
    if (i[gram].indexOf(k) === -1)
      i[gram].push(k);
  }
  return i;
}

export const query = (i, s, depth = 6) => {
  const gs = mkgrams(s);
  const outmap = new Map();
  for (const gram of gs)
    if (gram in i)
      for (const k of i[gram])
        outmap.set(k, (outmap.get(k) | 0) + 1)
  return outmap;
};
