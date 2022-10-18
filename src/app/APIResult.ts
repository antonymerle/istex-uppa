import { IstexRecord } from './IstexRecord';

export interface APIResult {
  total: number;
  nextPageURI?: string;
  firstPageURI?: string;
  lastPageURI?: string;
  hits: IstexRecord[];
}
