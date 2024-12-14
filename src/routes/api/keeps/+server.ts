import { json } from "@sveltejs/kit";

// from tutorial
// https://jimmymcbride.dev/blog/sveltekit-blog
export async function _getKeeps() {
  let keeps: Keep[] = [];

  const paths = import.meta.glob('/src/keeps/**/*.{md,svx}', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '').replace('.svx', '');

    if (file && typeof file == 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Keep, 'slug'>;
      const keep = { ...metadata, slug } satisfies Keep;

      keeps.push(keep);
    }
  }

  keeps = keeps.sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return keeps;
}

export async function GET() {
  const keeps = await _getKeeps();
  return json(keeps);
}

export const prerender = true;