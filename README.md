# joshdplo.me
The dot me of Josh D! This is the production branch of my personal website. It is running alongside [Slurpi](https://github.com/joshdplo/slurpi) and includes a search.

The below info is copied from `src/content/notes/joshdplo-v1-release.md`:

## Background
The original motivation for this site was to aid in job hunting by showing: "hey, I can build a modern website". As some creative things do - over the process of thinking, developing, dreaming, and doing - this project morphed into something more personal. I'm a relatively private person, and I've never created a public personal site before, so it'll be interesting to have a little part of me out in the wild. I'm looking forward to seeing how this site evolves. A few more technical details are below, but aside from that, here is the release of my site: joshdplo.me!!!

### Data Wrangling
The main thing I wanted to do with my site was to keep track of my media interests in one place: movies, shows, music, and games. I'm using [TMDB (themoviedb.org)](https://www.themoviedb.org/) for movies and tv, [Spotify](https://open.spotify.com) for music, and [Steam](https://steampowered.com) for games.

I wrote a tool to get all of the data from the respective APIs and store it in a sqlite database - I called the tool Slurpi. Because Spotify requires user auth to get liked songs, followed artists, etc, I had to build a UI to handle Spotify auth. Since I had to build the auth UI anyway, I figured I would just make the whole thing UI-based. Why is this relevant?! Because the data retrieved from Slurpi is required for the production Astro site to build. You can check the release notes below or [view the slurpi source on github](https://github.com/joshdplo/slurpi).

### From Vanilla to Sveltekit to Astro
The original implementation started with vanilla JS, but I figured - why not try out something new? I was hearing a lot about sveltekit, so I gave that a whirl. I spent about a month with sveltekit, and I gotta say - it was awesome. I really enjoyed working with it and learning the basics. Every past side project I've hosted has beeen dynamic - either a MVC or an API - so this time I wanted to have as static a site as possible. I eventually moved away from sveltekit in favor of Astro because I wanted to squeeze in learning another popular FE technology *and* it was a bit simpler to do SSG with. The great thing was that I could take my knowledge from svelte and use it to write svelte components in Astro. Overall, I had a good experience developing both with sveltekit and astro - both of their tutorials were great and made me excited to create something with them. If you look in the github repo's branches for this site, you can see the progression from inception to v3.

### The Search for Search
The last feature I wanted to build before launching was search. After reading a few posts about implementing [pagefind](https://pagefind.app/) in Astro, I gave it a whirl. It worked nicely for the blog-style content, but my custom media collections and the list-style in which they are displayed didn't really work well with pagefind. After pagefind, I tried a couple more client-side search libraries, but was not able to find one that was light and fit my use case. So I built my own search! It goes through all of Astro's built HTML files looking for data-attribute identifiers, and creates a JSON file with the title of items as the keys and includes a few metadata values about the items. It's very basic and straightforward, but it was one of the most satisfying parts of the site to build because once everything came together it turned out quite smooth. It is currently the only dynamic part of the site.

### A Note on Typescript
This is the first project I've used typescript in. While I did pick up some basics, especially while working with sveltekit, it is largely ignored in the initial version of the project. I like typescript and am looking forward to learning more, but I decided to prioritize completing the project. In the future, this will be a great codebase to learn typescript in because it's already implemented, and I can learn by going through the code and typing everything.

### V1 Release Notes
#### [Website](https://github.com/joshdplo/joshdplo.me)
- **Features**
  - List display for liked media items (called "likes"): uses paginated results, items contain URLs to their origin site.
  - Blog-like system (called "notes"): implemented via Astro collections, support for posts and tags, uses paginated results.
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