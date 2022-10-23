export interface Aggregation {
  corpusName: bucket;
  genre: bucket;
  langue: bucket;
  publicationDate: bucket;
}

interface bucket {
  buckets: Array<{ key: string; docCount: number }>;
}
