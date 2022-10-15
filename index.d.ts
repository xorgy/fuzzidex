declare module "fuzzidex" {
  export function mkgrams(s: string, depth?: number): Set<string>;
  export function mkgrams_vary(varier: (s: string) => string[], s: string, depth?: number): Set<string>;
  export function insert(index: object, key: any, index_string: string, depth?: number): object;
  export function insert_vary(varier: (s: string) => string[], index: object, key: any, index_string: string, depth?: number): object;
  export function query(index: object, query_string: string, depth?: number): Map<any, number>;
  export function query_vary(varier: (s: string) => string[], index: object, query_string: string, depth?: number): Map<any, number>;
  export function covary(vsi: string[], variers: ((s: string) => string[])[]): Iterable<string>;
  export function vary_obvious(s: string): Iterable<string>;
  export class InvertIndex {
    constructor ({depth, varier}?: {depth?: number, varier?: (s: string) => Iterable<string>});
    insert(k: any, index_string: string): void;
    query(query_string: string): Map<any, number>;
  }
}
