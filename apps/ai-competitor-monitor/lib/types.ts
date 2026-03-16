export type Site = { id: string; url: string; label: string; createdAt: string; tags?: string[] };
export type Snapshot = { id: string; siteId: string; capturedAt: string; normalizedText: string; rawLength: number };
export type Report = { id: string; siteId: string; at: string; summary: string; classification: string; severity: number; added: string[]; removed: string[] };
