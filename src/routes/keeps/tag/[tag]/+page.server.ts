import type { PageLoad } from './$types';
import { fetchKeeps } from '$lib/keeps';

export const load: PageLoad = async ({ params }) => {
  const tag = params.tag;
  const page = params.page || 1;
  const options = { tag, limit: -1 };
  const { keeps } = await fetchKeeps(options);

  return {
    keeps,
    tag,
    page,
    total: keeps.length
  };
}