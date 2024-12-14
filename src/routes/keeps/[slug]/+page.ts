import { error } from "@sveltejs/kit";
import type { ServerLoadEvent } from "@sveltejs/kit";


export const load = async ({ params }: ServerLoadEvent) => {
  try {
    console.log('slkadfkasjdf');
    const keepFile = await import(`../../../keeps/2024/${params.slug}.svx`);

    return {
      content: keepFile.default,
      meta: keepFile.meta
    }
  } catch (err) {
    throw error(404, `could not find ${params.slug}`);
  }
};

export const prerender = true;