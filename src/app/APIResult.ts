import { IstexRecord } from './IstexRecord';
import { Aggregation } from './Aggregation';

export interface APIResult {
  total: number;
  nextPageURI?: string;
  prevPageURI?: string;
  firstPageURI?: string;
  lastPageURI?: string;
  hits: IstexRecord[];
  aggregations: Aggregation;
}
