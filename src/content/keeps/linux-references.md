---
title: 'Linux Beginner References'
date: 2024-12-31
updated: 2025-01-01
description: 'A list of references for setting up and maintaining linux servers'
author: 'Josh'
image:
    pathname: 'tech-linux.png'
    alt: 'glitchy dark background with matrix letters'
tags: ["webdev", "linux"]
---

## Ubuntu Server Setup
- [Initial Server Setup (DO)](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu)
- **SSH Check `/etc/ssh/sshd_config.d/` for host configs and remove as necessary**
- ~~[SSH Config Change Port (Ubuntu v22+)](https://askubuntu.com/questions/1439461/ssh-default-port-not-changing-ubuntu-22-10-and-later/1439482#1439482)~~ (confirm if this is necessary or due to vps-set sshd_config.d/* files)
- [NGINX Setup (DO)](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)
- [NGINX LetsEncrypt Certs (DO)](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04)
- [NGINX/general grant access to user's directory](https://stackoverflow.com/a/25776092)
- [NGINX HTTP2 Setup (DO)](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-22-04)
- [NGINX Custom Error Pages (DO)](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-to-use-custom-error-pages-on-ubuntu-22-04)
- [NGINX Basic Password Authentication (DO)](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-22-04)
- [NGINX Reverse Proxy (DO)](https://www.digitalocean.com/community/tutorials/nginx-reverse-proxy-node-angular)

## Git
- [Git Hooks](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks)
