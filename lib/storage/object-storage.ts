export interface PrivateObjectStorage {
  put(key: string, body: Uint8Array, contentType: string): Promise<void>;
  createSignedReadUrl(key: string, expiresInSeconds: number): Promise<URL>;
  delete(key: string): Promise<void>;
}

export class StorageNotConfiguredError extends Error {
  constructor() {
    super("Private object storage is not configured.");
    this.name = "StorageNotConfiguredError";
  }
}

