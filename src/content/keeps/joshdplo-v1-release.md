---
title: 'Joshdplo.me V1 Release'
date: 2024-12-21
description: 'A tale of triumph in the face of terror and despair.'
author: 'Josh'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["release", "webdev"]
---

Joshdplo.me version one is live!@@!!@@!#!#!@!!  
The goals were: make something I will **actually use**, and learn while doing it. Goals accomplished 😎. The code needs *quite a bit* of improvement, but it's mine and I'm proud of it all the same. Now it's time to feel groovy about the work that's been done, start using the site, and go from there. Here are the credits for version 1 - thanks to all of the very sharp people who make these cool tools. Since there are 2 projects for this site (the website, and then the data), I'm including them both.

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
  