import { json } from "@sveltejs/kit";
import { _getKeeps } from '../keeps/+server';

/**
 * @TODO: currently returning all keeps inside of the tag's "keeps" array.
 * This should be fine for SSG, but probably would need to be re-written for
 * a dynamic site??
 */
async function getTags() {
  let tags: KeepTag[] = [];
  const keeps = await (_getKeeps());

  const tempObj: any = {}; //@TODO: fix typescript
  keeps.forEach(keep => {
    if (keep.tags) {
      keep.tags.forEach(tag => {
        if (!tempObj[tag]) {
          tempObj[tag] = {
            title: tag,
            path: `/keeps/tag/${tag}`,
            keeps: [keep]
          };
        } else {
          tempObj[tag].keeps.push(keep);
        }
      });
    }
  });

  for (let [key, val] of Object.entries(tempObj)) {
    tags.push(val as KeepTag);
  }

  return tags;
}

export async function GET() {
  const tags = await getTags();
  return json(tags);
}

export const prerender = true;