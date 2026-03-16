export type IndexedChunk = {
  id: string;
  documentId: string;
  fileName: string;
  page: number;
  chunkIndex: number;
  text: string;
  embedding: number[];
};

export type DocumentRecord = {
  id: string;
  fileName: string;
  uploadedAt: string;
  indexedAt: string;
  pageCount: number;
  chunkCount: number;
};
