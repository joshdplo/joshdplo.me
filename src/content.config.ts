import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

// Posts Collection @ local .md files
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    description: z.string(),
    author: z.string().optional(),
    image: z.object({
      pathname: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()),
  })
});

// EXPORT ALL COLLECTIONS
export const collections = { posts };
