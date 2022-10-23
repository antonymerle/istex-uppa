export interface Aggregation {
  corpusName: { buckets: Array<{ key: string; docCount: number }> };
  genre: { buckets: Array<{ key: string; docCount: number }> };
  langue: { buckets: Array<{ key: string; docCount: number }> };
  publicationDate: { buckets: Array<{ key: string; docCount: number }> };
}
