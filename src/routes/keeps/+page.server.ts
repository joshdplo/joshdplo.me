import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
  // fetch the keeps
  const keepsResponse = await fetch(`${url.origin}/api/keeps/keeps.json`);
  const keeps: Keep[] = await keepsResponse.json();

  // fetch total number of keeps
  const totalResponse = await fetch('/api/keeps/count');
  const total = await totalResponse.json();

  return { keeps, total };
}