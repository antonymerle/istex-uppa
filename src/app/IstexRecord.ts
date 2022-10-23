export interface IstexRecord {
  title: string;
  corpusName: string;
  author: Array<{ name: string; affiliations: Array<string> }>;
  subject: Array<string>;
  language: Array<string>;
  abstract: string;
  host: {
    title: string;
    volume: string;
    issue: string;
    pages: { first: string; last: string };
  };
  publicationDate: string;
  doi: string;
  fulltext: Array<{ extension: string; mimetype: string; uri: string }>;
  id: string;
  // score: number;
}
