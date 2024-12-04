# joshdplo.me
A personal .me website experience built using sveltekit and verniller j S

## Preamble

### WHAT THE HECK IS THIS?!
This is just a fun, loud, personal site experience. The original idea for this project was to make a profesional portfolio to get a new job. After too many hours of kicking around ideas about how best to design a unique portfolio; how best to display my resume; how best to show I have value to potential employers; I though..."oh yeah, that's what linkedin is for", and felt like a goof. I then shifted focus to creating something that I'm actually going to use - why would I spend 999999 designing and coding up  a "professional portfolio" that I won't ever get any use out of? SILLY! So this project turned into a feat for the me...by the me! This project is for me to enjoy and learn on. Of course, you can clone it or fork it or spoon it or whatever you want to do and use it also if you'd like! @TODO make sure there's a MIT LICENSE file in the repo

### DO YOU EVEN KNOW REACT?!
I tried for a long time to learn React - I took Wes Boss's course like 4 years ago and built a sweet (fish market?) app. I thought it was so amazing and yes, I loved it, but then I  completely forgot how to use react because I didn't use it for a while. I tried another couple projects with React - my favorite one was called "Lollipop" and it was a react front end/express server that hugged the Leage of Legends API to get player game history data and display it nice-like. ~~Maybe I'll dig it out of my other github account and re-make it sometime!~~ The point is, yeah I know a little bit about React, but for some reason I never went full-in. Kinda funny, right? Because now 99839239% of FE jobs are React dev jobs.

### DO YOU EVEN KNOW VUE?!
Not really. I spent most of my time toying with react. I did have a project at my last agency job that used some vue on the front end, so I did learn a little...HOWEVER, it was using vue in conjuction with majority vanilla JS, so I spent most of my time working on feature and bug tickets in the 999999-file codebase and was more in the "getting stuff done/learning the codebase" mode than the pure "learning vue weee" mode, so that's that. It seems great and a lot of people like it, so go vue!!

### SO WHY THE HECKS DID YOU CHOOSE SVLETEKIT?!
The tutorial was great. That's mostly it, really. It was easy to pick up and emphasized that you can just start slow and build from there. That's exactly what I wanted - it's a pretty big undertaking for me to learn a new framework, because I want to get good at it and that takes a lot of time. Another part is the tooling - it just works. Before committing to sveltekit, I tried nextjs and astro, but they didn't really click. AND THAT'S WHY I CHOSE SVELTEKIT!

### YOU SUCK AT TYPESCRIPT
I do, but I will get better. One day.

## The Project Goal
I wanted to have a a largely static site but leave room for dynamic pages for the future. I'm really boring, so the way I'm expressing myself is through my interests such as movies, shows, and games. I wrote `/scripts` to grab data from [TMDB](https://www.themoviedb.org/) and [Steam](https://store.steampowered.com/). I don't really need a database since the data I'm pulling down doesn't change too often, so I opted to just store all of my data in json files and then import it to generate pages. If the data does change, I just run a handy `node scripts/generate-json.js`, grab the good stuff, and then re-build. Not too bad.

## Can I clone this and use it for myself?
Totes - I would be honored. @TODO make sure there's a MIT LICENSE file in the repo

## Credits
- [sveltekit](https://svelte.dev/docs/kit/introduction)
- [css.gg](https://css.gg/)
- [iconmonstr](https://iconmonstr.com/)
- [Google Fonts](https://fonts.google.com/)
- [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)
- [Steam Web API](https://steamcommunity.com/dev)