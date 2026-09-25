import { getCloudflareContext } from "@opennextjs/cloudflare";

/** The small slice of the Cloudflare D1 API this app uses (keeps us free of extra type packages). */
export interface D1Result<T> {
  results: T[];
  success: boolean;
  meta: { changes?: number };
}

export interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<D1Result<unknown>>;
}

export interface D1Like {
  prepare(sql: string): D1Statement;
  batch(statements: D1Statement[]): Promise<D1Result<unknown>[]>;
}

export function getDb(): D1Like {
  return getCloudflareContext().env.DB;
}

export function getAuthSecret(): string {
  const secret = getCloudflareContext().env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET is missing or too short. See .dev.vars.example.");
  }
  return secret;
}

/** Escapes % and _ so user text is matched literally inside a LIKE pattern. */
export function likePattern(term: string): string {
  return `%${term.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
}

export function newId(): string {
  return crypto.randomUUID();
}
