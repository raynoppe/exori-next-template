/** Renders only on Exori preview deploys (`NEXT_PUBLIC_EXORI_PREVIEW=1`). */
export function ExoriPreviewDevtools() {
  if (process.env.NEXT_PUBLIC_EXORI_PREVIEW !== "1") return null;
  return <script src="/__exori/devtools.js" data-exori-devtools />;
}
