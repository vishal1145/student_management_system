import { ZodError } from "zod";
import type { ZodType } from "zod";
import { fieldErrorsFrom } from "@/lib/validation/common";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly fields?: Record<string, string>,
  ) {
    super(message);
  }
}

const NO_STORE = { "Cache-Control": "no-store" };

export function ok<T>(data: T, status = 200): Response {
  return Response.json({ data }, { status, headers: NO_STORE });
}

export function failure(error: unknown): Response {
  if (error instanceof HttpError) {
    return Response.json(
      { error: { code: error.code, message: error.message, fields: error.fields } },
      { status: error.status, headers: NO_STORE },
    );
  }
  if (error instanceof ZodError) {
    return Response.json(
      { error: { code: "validation", message: "Please fix the highlighted fields.", fields: fieldErrorsFrom(error) } },
      { status: 422, headers: NO_STORE },
    );
  }
  console.error("Unhandled API error:", error);
  return Response.json(
    { error: { code: "server", message: "Something went wrong on our side. Please try again." } },
    { status: 500, headers: NO_STORE },
  );
}

/** Reads and validates a JSON body. Throws a 422 with per-field messages on bad input. */
export async function readJson<T>(request: Request, schema: ZodType<T>): Promise<T> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new HttpError(400, "bad_json", "The request body must be valid JSON.");
  }
  return schema.parse(body);
}

/** CSRF defence for cookie auth: state-changing calls must come from our own origin. */
export function assertSameOrigin(request: Request): void {
  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) return;
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    throw new HttpError(403, "bad_origin", "Cross-site requests are not allowed.");
  }
}
