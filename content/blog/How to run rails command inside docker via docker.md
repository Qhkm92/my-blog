---
title: "How to run rails command inside docker via docker-compose"
date: "2021-01-03"
categories: ["rails", "docker"]
---

If you are using `docker-compose` to easily run your container, you can use the command below to run any bash command via docker-compose

```bash
docker-compose run db rails db:migrate
```
