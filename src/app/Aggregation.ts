export interface Aggregation {
  corpusName: Bucket;
  genre: { buckets: Array<{ key: string; docCount: number }> };
  language: { buckets: Array<{ key: string; docCount: number }> };
  publicationDate: { buckets: Array<{ key: string; docCount: number }> };
}

export interface Bucket {
  buckets: Array<{ key: string; docCount: number }>;
}
