import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
  const keepsResponse = await fetch('/api/keeps');
  const keeps: Keep[] = await keepsResponse.json();

  const tagsResponse = await fetch('/api/tags');
  const tags: KeepTag[] = await tagsResponse.json();
  return { keeps, tags };
}