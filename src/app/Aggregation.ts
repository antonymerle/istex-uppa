export interface Aggregation {
  corpusName: Bucket;
  genre: { buckets: Array<{ key: string; docCount: number }> };
  language: { buckets: Array<{ key: string; docCount: number }> };
  publicationDate: { buckets: Array<{ key: string; docCount: number }> };
}

export interface Bucket {
  buckets: Array<Facet>;
}

export interface Facet {
  key: string;
  docCount: number;
  checked: boolean;
}

export interface FacetContainer {
  corpusNamecheckedFacets: Facet[];
  genrecheckedFacets: Facet[];
  languagecheckedFacets: Facet[];
  publicationDatecheckedFacets: Facet[];
}

export enum FacetCategory {
  corpusName,
  genre,
  language,
  publicationDate,
}
