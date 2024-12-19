import type { PageLoad } from './$types';
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }) => {
  const tagsResponse = await fetch('/api/keeps/tags');
  const tags: KeepTag[] = await tagsResponse.json();

  let tagData = null;
  tags.forEach(tag => {
    if (tag.title === params.title) tagData = tag;
  });

  if (tagData) {
    return { tag: tagData }
  } else {
    throw error(404, `Tag ${params.title} not found`);
  }

}