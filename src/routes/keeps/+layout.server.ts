import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, fetch }) => {
  // fetch the keeps @TODO (will change once we implement pagination!)
  const keepsResponse = await fetch(`${url.origin}/api/keeps/keeps.json`);
  const keeps: Keep[] = await keepsResponse.json();

  // create a new PageMenu links array from all tags
  const tagsResponse = await fetch('/api/keeps/tags?array=true');
  const tags: KeepTag[] = await tagsResponse.json();

  return { keeps, tags };
}