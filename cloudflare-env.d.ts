import type { D1Like } from "@/server/db";

declare global {
  interface CloudflareEnv {
    DB: D1Like;
    /** Secret used to sign session cookies. Set with `wrangler secret put AUTH_SECRET`. */
    AUTH_SECRET: string;
  }
}

export {};
