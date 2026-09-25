/** Client-side fetch wrapper shared by every module's api.ts. */
export type FieldErrors = Record<string, string>;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string = "unknown",
    public readonly fields: FieldErrors = {},
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiBody<T> = { data: T } | { error: { code: string; message: string; fields?: FieldErrors } };

export async function apiFetch<T>(url: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, headers, ...rest } = init;
  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: { ...(json !== undefined ? { "Content-Type": "application/json" } : {}), ...headers },
      body: json !== undefined ? JSON.stringify(json) : rest.body,
      credentials: "same-origin",
    });
  } catch {
    throw new ApiError("Cannot reach the server. Check your internet connection and try again.", 0, "network");
  }

  let body: ApiBody<T> | null = null;
  try {
    body = (await response.json()) as ApiBody<T>;
  } catch {
    body = null;
  }

  if (body && "data" in body && response.ok) return body.data;
  if (body && "error" in body) {
    throw new ApiError(body.error.message, response.status, body.error.code, body.error.fields);
  }
  throw new ApiError("Something went wrong. Please try again.", response.status);
}

export function toQuery(params: Record<string, string | number | undefined | null>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  }
  const text = search.toString();
  return text ? `?${text}` : "";
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
