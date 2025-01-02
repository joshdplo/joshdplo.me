---
title: 'nginx stat permission denied when accessing user directory'
date: 2024-12-29
description: 'When running default nginx and trying to read files in a user directory, there is a stat permission denied error'
author: 'Josh'
image:
    pathname: 'tech-linux.png'
    alt: 'glitchy dark background with matrix letters'
tags: ["webdev", "linux"]
---

## [Here's the stackoverflow solve by Maciej Sz](https://stackoverflow.com/a/25776092)
The problem seems pretty normal - the `www-data` default nginx user that is automatically created when installing nginx (and runs, at least, the file access process for nginx) does not have permission to access other users' directories. I didn't realize you could run commands as another user outside of doing `su - someuser`! So I was very excited to learn that doing this: `sudo -u bettysue stat /home/slimjim/websites` is possible. After that, it made way more sense.

### This happens when running default nginx with a sudo user
With a generic ubuntu setup something like [this digitalocean ubuntu setup guide](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu) and a generic nginx setup something like [this digitalocean nginx setup guide](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04), the issue will happen every time you tell nginx to access a file in a user directory ie. `root /home/slimjim/static-site;`. This does *not* happen if you use a reverse proxy to serve something like a node/express app which is ran by the user - only when directly accessing files within the users' home directory (via nginx's default `www-data` user).

### I don't know how this impacts security
I'm a beginner at linux so you might want to peep the web if you need to take extra precautions when using this approach. I'd imagine it is more of a concern on multi-user systems? All it seems to be doing is adding another user to a given user's usergroup, so if you are on a single-user VPS hosting your own stuff, you already *are* all the users 🤯.

### THE END
Check out the stackoverflow post and hopefully this helps you if you've been stuck trying to do something sweet in your nginx config like `autoindex on;`. Wooooh!