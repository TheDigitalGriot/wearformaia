/** Prefix a /public asset path with the deploy base (e.g. "/formaia/"). */
export function asset(p?: string): string | undefined {
  if (!p) return p;
  return import.meta.env.BASE_URL + p.replace(/^\//, "");
}
