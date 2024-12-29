---
title: 'Nginx permission denied when accessing user directory'
date: 2024-12-28
description: 'When running default nginx and trying to read files in a user directory, there is a stat permission denied error'
author: 'Josh'
image:
    pathname: 'keeps-light-clouds.webp'
    alt: 'dark background'
tags: ["webdev"]
---

## [Here's the stackoverflow solve by Maciej Sz](https://stackoverflow.com/a/25776092)
The problem seems pretty normal - the `www-data` default nginx user that is automatically created when installing nginx does not have permission to access other user's directories. I didn't realize you could run commands as another user so I was very excited to learn that doing this: `sudo -u cooljohn stat /home/slimjim/websites` is possible. After that, it made way more sense.

### This happens when running default nginx with a sudo user
With a generic ubuntu setup something like [this digitalocean ubuntu setup guide](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu) and a generic nginx setup something like [this digitalocean nginx setup guide](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04), this issue is something that will happen every time you tell nginx to access a file in a user directory ie. `root /home/slimjim/static-site;`. This does *not* happen if you use a reverse proxy to serve something like a node/express app which is ran by the user - only when directly accessing files within the user's home directory.

### I don't know how this impacts security
I'm not very good at linux so you might want to peep if you need to take extra precautions when using this approach.

### The End
Check out the stackoverflow post and hopefully this helps you if you've got stuck trying to do something sweet in your nginx config like `autoindex on;`. Wooooh!