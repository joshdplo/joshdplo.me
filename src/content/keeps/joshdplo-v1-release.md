---
title: 'Joshdplo.me V1 Release'
date: 2024-12-21
description: 'A brief write-up on the release of joshdplo.me'
author: 'Josh'
image:
    pathname: 'keep_v1release.png'
    alt: 'fantasical multi-colored pastel clouds in space'
tags: ["release", "webdev"]
---
This is the write-up for the first version of my website! [Jump to the release notes](#v1-release-notes) / [Visit the Github Repo](https://github.com/joshdplo/joshdplo.me).

## Background
I started writing a grand account here all about my origins as a front-end dev and as I tried to edit it down I realized...BORING! All that's a story for another time. The original motivation for this site was to aid in job hunting by showing: "hey, I can build a modern website". I'm not a freelance, so creating a portfolio site doesn't make much sense for me, and all of my professional info is already available on linkedin. I do, however, need something relevant to show prospective employers, so this site and its codebase can serve as a part of that. As some creative things do, over the process of thinking, developing, dreaming, and doing, this project morphed into something more personal and meaningful. I'm not a social media user, and I've never really created a personal site before, so it's neat to have a little part of me out in the wild that I can add to and transform over time.

### Data Wrangling
The main thing I wanted to do with my site was to display all of my media interests in one place: movies, shows, music, and games! I'm using [TMDB (themoviedb.org)](https://www.themoviedb.org/) for movies and tv, [Spotify](https://open.spotify.com) for music, and [Steam](https://steampowered.com) for games.

I wrote a tool to get all of the data from the respective APIs and store it in a sqlite database - I called the tool Slurpi. Because Spotify requires user auth to get liked songs, followed artists, etc, I had to build a UI to handle Spotify auth. Since I had to build the auth UI anyway, I figured I would just make the whole thing UI-based. Why is this relevant?! Because the data retrieved from Slurpi is required for the Astro site to build. You can check the release notes below or [view the slurpi source on github](https://github.com/joshdplo/slurpi).

### From Vanilla to Sveltekit to Astro
The original implementation started with vanilla JS, but I figured - why not try out something new? I was hearing a lot about sveltekit, so I gave that a whirl. I spent about a month with svelte/sveltekit, and I gotta say - it was awesome. I really enjoyed working with it and learning the basics. Every past side project I've hosted has beeen very dynamic, so this time I wanted to have as static a site as possible. I moved away from sveltekit in favor of Astro for this reason. I had heard of Astro but never really used it before. The great thing was that I could take my knowledge from svelte and use it to create svelte components in Astro. Overall, I had a good experience developing both with sveltekit and astro - both of their tutorials were great and made me excited to create something with them.

### The Search for Search
The last feature I wanted to build before launching was search. After reading a few posts about implementing [pagefind](https://pagefind.app/) in Astro, I gave it a whirl. It worked nicely for the blog-style content, but my custom media collections and the list-style in which they are displayed didn't really work well with pagefind. After pagefind, I briefly tried out [orama](https://docs.orama.com/), which was nice but didn't really fit my use case either. So I built my own search! It goes through all of Astro's built HTML files looking for a data-attribute identifier, and creates a JSON file with the title of items as the keys and includes a few metadata values about the items. Though it's very straightforward, it was one of the most satisfying parts of the site to build because it turned out quite smooth. It is also the only dynamic part of the site (so far).

### A Note on Typescript
This is the first project I've used typescript in. While I did pick up some basics, it is largely ignored in the initial version of the project. I like typescript and am looking forward to learning more, but I decided to prioritize completing the project. The cool thing is it will be a great codebase to learn typescript in because I can learn by going through the code and typing everything.

### V1 Release Notes
#### [Website](https://github.com/joshdplo/joshdplo.me)
- **Features**
  - List display for liked media items (called "likes"): uses paginated results, items contain URLs to their origin site.
  - Blog-like system (called "keeps"): implemented via Astro collections, support for posts (called "notes") and tags, uses paginated results.
  - Custom Search: create search index from built astro html files, use express to handle search queries (in-memory)
  - Basic OG/Twitter metadata component
  - Dark/light theme with localStorage memory
- **Tech**
  - built with [nodejs](https://nodejs.org/en)
    - using [astro](https://astro.build)
      - using [vite](https://vite.dev)
      - using [svelte](https://svelte.dev)
      - using [sass](https://sass-lang.com/)
    - using [express](https://expressjs.com/)
    - using [cheerio](https://cheerio.js.org/)

#### [Slurpi (Data)](https://github.com/joshdplo/slurpi)
- **Features**
  - retrieve user's data via API, format and store data in sqlite database
  - services supported:
    - TMDB (themoviedb.org)
    - Steam
    - Spotify
  - .env configuration for API keys
  - UI to trigger data fetching (manually only)
  - UI to add further ratings to data ("super" rating, "mega" rating)
- **Tech**
  - built with [nodejs](https://nodejs.org/en)
    - using [express](https://expressjs.com/)
      - using [ejs](https://ejs.co/)
      - using [ws (websockets)](https://github.com/websockets/ws)
    - using [sqlite](https://www.sqlite.org/)
    - using [sequelize](https://sequelize.org/)
    - using [vite](https://vite.dev/)

#### Thanks
Thanks to my parents for letting me and my dog stay in their guest room while I figure out what's next. Thanks to my friends for listening to my rantings and progress reports and watching my demos over the course of both this site's development, and the previous project's development ([cubesdirect!](https://github.com/joshdplo/cubesdirect-vanilla)). And, of course, thanks to all of the super smart people who make the tools like node, express, astro, svelte, vite, and many more!