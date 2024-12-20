import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
  // create a new PageMenu links array from all tags
  const tagsResponse = await fetch('/api/keeps/tags?array=true');
  const tags: KeepTag[] = await tagsResponse.json();

  return { tags };
}