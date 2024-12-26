import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
import Movie from "@slurpi/db/Movie.js";
import Show from "@slurpi/db/Show.js";
import SteamGame from "@slurpi/db/SteamGame.js";
import SpotifySong from "@slurpi/db/SpotifySong.js";
import SpotifyArtist from "@slurpi/db/SpotifyArtist.js";

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
      pathname: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()),
  })
});

// Movies Collection @ slurpi
const movies = defineCollection({
  loader: async () => {
    const data = await Movie.findAll({ order: [['title', 'ASC']], raw: true });

    return data.map((item) => {
      const { id, ...itemData } = item;
      return {
        id: `${item.id}`,
        ...itemData
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
});

// Shows Collection @ slurpi
const shows = defineCollection({
  loader: async () => {
    const data = await Show.findAll({ order: [['name', 'ASC']], raw: true });

    return data.map((item) => {
      const { id, ...itemData } = item;
      return {
        id: `${item.id}`,
        ...itemData
      };
    });
  },
  schema: z.object({
    adult: z.number(),
    genre_ids: z.string(),
    original_language: z.string(),
    overview: z.string(),
    poster_path: z.string(),
    first_air_date: z.string(),
    name: z.string(),
    rating: z.number().optional().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    mega: z.number()
  }),
});

// Songs Collection @ slurpi
const songs = defineCollection({
  loader: async () => {
    const data = await SpotifySong.findAll({ order: [['name', 'ASC']], raw: true });

    return data.map((item) => {
      const { id, ...itemData } = item;
      return {
        id: `${item.id}`,
        ...itemData
      };
    });
  },
  schema: z.object({
    isTopTrack: z.number(),
    name: z.string(),
    artists: z.string(),
    duration_ms: z.number(),
    url: z.string(),
    image: z.string(),
    release_date: z.string(),
    super: z.number(),
    mega: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

// Artists Collection @ slurpi
const artists = defineCollection({
  loader: async () => {
    const data = await SpotifyArtist.findAll({ order: [['name', 'ASC']], raw: true });

    return data.map((item) => {
      const { id, ...itemData } = item;
      return {
        id: `${item.id}`,
        ...itemData
      };
    });
  },
  schema: z.object({
    name: z.string(),
    genres: z.string(),
    url: z.string(),
    image: z.string(),
    super: z.number(),
    mega: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

// Games Collection @ slurpi
const games = defineCollection({
  loader: async () => {
    const data = await SteamGame.findAll({ order: [['name', 'ASC']], raw: true });

    return data.map((item) => {
      const { id, ...itemData } = item;
      return {
        id: `${item.id}`,
        ...itemData
      };
    });
  },
  //@TODO: the games schema can contain "invalid" games
  // we won't ever use these, so they should just be removed on the slurpi side
  schema: z.object({
    appid: z.number(),
    recent: z.number(),
    playtime_forever: z.number(),
    name: z.string().optional().nullable(),
    is_free: z.number().optional().nullable(),
    short_description: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
    header_image: z.string().optional().nullable(),
    capsule_image: z.string().optional().nullable(),
    developers: z.string().optional().nullable(),
    publishers: z.string().optional().nullable(),
    platforms: z.string().optional().nullable(),
    categories: z.string().optional().nullable(),
    genres: z.string().optional().nullable(),
    release_date: z.string().optional().nullable(),
    createdAt: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
    invalid: z.number(),
    super: z.number(),
    mega: z.number(),
  }),
});

// EXPORT ALL COLLECTIONS
export const collections = { keeps, movies, shows, songs, artists, games };
