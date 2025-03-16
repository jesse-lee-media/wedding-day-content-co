export type StripString<T> = T extends { value: infer V }
  ? Omit<T, 'value'> & { value: Exclude<V, string> }
  : T;
