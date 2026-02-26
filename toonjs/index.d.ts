export type ToonPrimitive = number | string | boolean | null;

export type ToonValue =
  | ToonPrimitive
  | ToonPrimitive[]
  | Record<string, any>;

export type ToonRecord = Record<string, ToonValue>;

export function sendToon(
  data: Record<string, ToonRecord | ToonRecord[]>
): string;

export function receiveToon(input: string): any;

export function reqGetToon(req: { body: string }): any;

export function resSendToon(
  res: { type: (t: string) => any; send: (b: string) => any },
  data: any
): void;

declare const toonkit: {
  sendToon: typeof sendToon;
  receiveToon: typeof receiveToon;
  reqGetToon: typeof reqGetToon;
  resSendToon: typeof resSendToon;
};

export default toonkit;
