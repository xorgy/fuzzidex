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
