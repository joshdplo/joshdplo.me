---
title: 'Joshdplo.me V1 Release'
date: 2024-12-21
description: 'From vanilla to sveltekit to astro: an enchanting tale of triumph in the face of terror and despair.'
author: 'Josh'
image:
    pathname: 'keep_v1release.png'
    alt: 'fantasical multi-colored pastel clouds in space'
tags: ["release", "webdev"]
---
This is the write-up for the first version of my website. [Jump to the release notes](#v1-release-notes) / [Visit the Github Repo](https://github.com/joshdplo/joshdplo.me).

## Background
When I was looking for my very first front-end job, almost 10 years ago, --REWRITE THIS COMPLETELY--

## Data Wrangling
The main thing I wanted to do with my site was to capture all of my favorite media in one place: movies, shows, music, and games! I'm using [TMDB (themoviedb.org)](https://www.themoviedb.org/) for movies and tv, [Spotify](https://open.spotify.com) for music, and [Steam](https://steampowered.com) for games.

I wrote Slurpi as a tool to get all of the data from the APIs and store it in a sqlite databasae. Because Spotify requires user auth to get liked songs, followed artists, etc, I decided to build out Slurpi's UI to handle Spotify auth and give some visual feedback. Slurpi is required for the Astro site to build. [You can view the slurpi source here](https://github.com/joshdplo/slurpi).

## From Vanilla to Sveltekit to Astro and beyond
how we went from vanilla to sveltekit to astro

## The Search for Search
The last feature I wanted to build before launching was search. After reading a few posts about implementing [pagefind](https://pagefind.app/) in Astro, I gave it a whirl. It worked nicely for the blog-style content, but my custom collections and the way they are layed out didn't really jive well with pagefind. After pagefind, I briefly tried out [orama](https://docs.orama.com/), which didn't really fit my use case either. So I built my own search! It goes through all collections and creates a JSON file with the title of items as the keys and includes a small amount of metadata about the items. Though it's very straightforward, it was one of the most satisfying parts of the site to build because it turned out quite smooth. It is also the only dynamic part of the site.

### V1 Release Notes
## [Website](https://github.com/joshdplo/joshdplo.me)
- **Tech**
  - built with [nodejs](https://nodejs.org/en)
  - using [vite](https://vite.dev)
  - using [astro](https://astro.build)
  - ~~using [sveltekit](https://svelte.dev/docs/kit/introduction)~~
  - ~~using [mdsvex](https://github.com/pngwn/MDsveX)~~
  - using [sass](https://sass-lang.com/)
- **Code References**
  - [Sveltekit tutorial](https://svelte.dev/tutorial/kit/introducing-sveltekit)
    - is great to learn the basics and then i was referencing it during the build a ton
  - [Josh Collinsworth's sveltekit blog starter](https://github.com/josh-collinsworth/sveltekit-blog-starter/tree/main)
    - extremely helpful to see the source, and really liked the hyperlegible font so decided to use it here as well.
  - [Jimmy McBride's sveltekit blog tutorial](https://jimmymcbride.dev/blog/sveltekit-blog)
    - the example that ultimately ended up making things click for me! thanks to this great walkthrough and his codebase as well to provide insight on how this whole sveltekit blog setup works
  - [This stackoverflow post by brunnerh](https://stackoverflow.com/a/76147868)
    - how to include static data via `define` in vite - haven't used vite tons, so didn't realize this was an option

## [Slurpi (Data)](https://github.com/joshdplo/slurpi)
Slurpi is a tool I made to save media information into a database so I could then 
add to it, sort it, and use it. Eventually it will be merged into the website repo, but 
monorepos are confusing and that's a project for another day.

- **Tech**
  - built with [nodejs](https://nodejs.org/en)
  - using [express](https://expressjs.com/)
  - using [sqlite](https://www.sqlite.org/)
    - using [sqlite3](https://github.com/TryGhost/node-sqlite3)
    - using [sequelize](https://sequelize.org/)
  - using [vite](https://vite.dev/)
  - using [sass](https://sass-lang.com/)
- **Code References**
  - [Sequelize Docs](https://sequelize.org/docs/v6/getting-started/)
  