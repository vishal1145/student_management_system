"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { errorMessage } from "@/lib/http";

type State<T> = { token: string; data?: T; error?: string };

/**
 * Loads data whenever `key` changes. Keeps the previous data on screen while the next
 * page loads, and exposes `reload()` for after create / update / delete.
 */
export function useApiQuery<T>(fetcher: () => Promise<T>, key: string) {
  const [state, setState] = useState<State<T>>({ token: "" });
  const [nonce, setNonce] = useState(0);
  const fetcherRef = useRef(fetcher);
  const token = `${key}#${nonce}`;

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let cancelled = false;
    fetcherRef.current().then(
      (data) => !cancelled && setState({ token, data }),
      (error) => !cancelled && setState((previous) => ({ token, data: previous.data, error: errorMessage(error) })),
    );
    return () => {
      cancelled = true;
    };
  }, [token]);

  const reload = useCallback(() => setNonce((value) => value + 1), []);
  const settled = state.token === token;

  return { data: state.data, error: settled ? state.error : undefined, loading: !settled, reload };
}
