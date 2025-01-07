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
This is the write-up for the first version of my website. If you want to skip the heart-wrenching background story, you can [jump to the release notes](#v1-release-notes) or [visit the github repo](https://github.com/joshdplo/joshdplo.me).

## Background
When I was looking for my very first front-end job, almost 10 years ago now, it seemed like a no-brainer that I wouldn't get very far without first creating a portfolio site to showcase all of my previous work. So, naturally, I created a portfolio with great care, made it look nice, and was ready to show it off. After going to my first interview, I noticed that the recruiter had removed my portfolio site from the resume that was being sent to companies. I called her up and told her that she forgot to include my website on the resume. She told me it was on purpose - she said nobody cared about portfolio sites, and it probably would do more harm than good, so she removed it. I was so mad! I had put a lot of energy into creating a site!

I always have a laugh when I think about that experience today. She was the recruiter, and even though it baffled me, I just let her do her job. She was able to place me at a great company, so everything worked out in the end. I spent the next 3 years at that company, and then got my second front-end job through a co-worker's husband, so I didn't have to go through the actual job hunt process again. After five years at my second job, I decided to take an extended break. Ok - now we're all cought up temporally, so who cares about portfolio sites and what am I even talking about?!

Well...remember that extended break? It's over now, and I'm ready to get a new job. So I start taking a look at jobs and then I start applying to jobs. And yah yah - this is basically the worst time ever to be a front-end developer so there's that, but also something way more important hit me when I started applying for jobs. The thing that hit me was "holy crap I don't actually care at all about these jobs that I'm applying to". So I began looking for companies that I might fit into and be excited about. I found one that I really liked - and on their "how to get a job" page, in bold letters, it says "we want you to show us something". That paragraph gave me the kick in the pants i needed to get going.

However, as these things tend to go, I was a ding dong, and I didn't take screenshots or keep any detailed notes from my last agency job of five years. So I don't really have anything to show except for a boring ol' resume with my name and a bunch of talky tech words and business lingo like "provided value to clients".

Now for the last 3 months, I've been making stuff to show. I started with a giant project to create a full e-commerce site that sells fake cubes. That was cool. And then once I was 90% finished with that I realized I didn't have anything that was my own - I didn't have anything that was actually authentic or important to me - I just had a bunch of (cool) stuff that I thought I needed to have because it might help me get a job.

After my last experience with building a portfolio site, I thought there would never be any way I'd make another one. And then I finally understood...I don't need a portfolio site - I need a me site! Something that I am invested in; will actually use; and can be proud of; even if it's just for myself, and even if it's imperfect, beacuse then I'll really have something to show.

So here that thing is: it's called joshdplo.me, and it's my sweet website!!!

## From Vanilla to Sveltekit to Astro and beyond



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
  