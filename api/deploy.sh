#!/bin/bash


echo Version?
read VERSION 

docker build -t selich/isa-2020:$VERSION .
docker push selich/isa-2020:$VERSION
ssh  root@46.101.99.155 "docker pull selich/isa-2020:$VERSION && docker tag selich/isa-2020:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
