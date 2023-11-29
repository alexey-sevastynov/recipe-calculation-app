export function getIconUrl(url?: string) {
  return new URL(`../assets/icon/${url}`, import.meta.url).href;
}
