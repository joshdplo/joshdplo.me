import type { ServerLoadEvent } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";


export const load = async ({ params }: ServerLoadEvent) => {
  try {
    let keepFile = null;
    let keep = null;
    const comps = import.meta.glob('../../../keeps/**/*.md');
    for (const path in comps) {
      if (path.indexOf(params.slug) > -1) keepFile = comps[path];
    };

    if (keepFile) {
      keep = (await keepFile());
    } else {
      throw error(404, `${params.slug} not found`);
    }

    return {
      content: keep.default,
      meta: keep.metadata,
    }
  } catch (err) {
    console.error(err);
    throw error(404, `Keep not found`);
  }
};

export const prerender = true;