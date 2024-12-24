import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
import Movie from "@slurpi/db/Movie.js";
import Show from "@slurpi/db/Show.js";
import SteamGame from "@slurpi/db/SteamGame.js";
import SpotifySong from "@slurpi/db/SpotifySong.js";
import SpotifyArtist from "@slurpi/db/SpotifyArtist.js";
import SpotifyAlbum from "@slurpi/db/SpotifyAlbum.js";
import SpotifyShow from "@slurpi/db/SpotifyShow.js";

// Keeps Collection @ local .md files
const keeps = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/keeps" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    description: z.string(),
    author: z.string().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string()),
  })
});

// Movies Collection @ slurpi
const movies = defineCollection({
  loader: async () => {
    const data = await Movie.findAll({ order: [['title', 'ASC']], raw: true });
    return data.map((movie) => {
      const { id, ...movieData } = movie;
      return {
        id: `${movie.id}`,
        ...movieData
      };
    });
  },
  schema: z.object({
    adult: z.number(),
    genre_ids: z.string(),
    original_language: z.string(),
    overview: z.string(),
    poster_path: z.string(),
    release_date: z.string(),
    title: z.string(),
    rating: z.number().optional().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    mega: z.number()
  }),
})

// EXPORT ALL COLLECTIONS
export const collections = { keeps, movies };
