declare module "fuzzidex" {
  export function mkgrams(s: string, depth?: number): Set<string>;
  export function insert(index: object, key: any, index_string: string, depth?: number): object;
  export function query(index: object, query_string: string, depth?: number): Map<any, number>;
}
