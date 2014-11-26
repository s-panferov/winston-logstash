#!/bin/bash
docker run -d \
-e LOGSTASH_CONFIG_URL="https://gist.githubusercontent.com/jaakkos/00ed0a01f5c43f8c9e55/raw/5965c657fbe0897e3f34357390acf404cc71a7a8/winston-logstash.conf" \
--name winston-logstash \
-p 9292:9292 \
-p 9200:9200 \
-p 28777:28777 \
pblittle/docker-logstash

