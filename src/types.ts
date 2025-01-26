/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export type FunctionContainer = {
  name: string;
  signature: string;
  ref: Function;
  accessibility: Array<ObjectContainer>;
};
export type ObjectContainer = {
  name: string;
  object: object;
};
