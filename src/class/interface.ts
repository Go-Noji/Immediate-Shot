//Filename 関連
export interface Template {
  template: string,
  value: string
}
export type Templates = Template[];

//Queries 関連
export type QueryValue = string | true;
export interface QueryPare {[key: string]: QueryValue};
export interface History {
  url: string,
  queries: QueryPare
}
export interface Histories {
  [key: number]: History
}

//Sizing 関連
export interface Information {
  windowWidth: number,
  windowHeight: number,
  documentWidth: number,
  documentHeight: number,
  widthCaptureNumber: number,
  heightCaptureNumber: number,
  captureNumber: number,
  ratio: number,
  ratioType: string,
  scrollX: number,
  scrollY: number
}
export interface Coordinates {
  x: number,
  y: number
}

//Chrome に保管する設定値
export type Range = 'full' | 'display' | 'perfect';
export interface Settings {
  range: Range,
  title: string,
  counter: number,
  interval: number,
  max: boolean
}
