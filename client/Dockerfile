#  (c) Copyright Merative US L.P. and others 2020, 2022
#
#   SPDX-License-Identifer: Apache 2.0
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

# base image built using server/deploy/baseimage/Dockerfile
# must specify correct Docker registry
FROM centos/nodejs-12-centos7:latest AS base

WORKDIR /whuser

COPY dist ./
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# We always want to update any installed packages
# Helps eliminate potential security vulnerabilities
# if any have popped up over time in the base image
USER root
RUN microdnf update -y && rm -rf /var/cache/yum \
   && microdnf clean all

RUN chown -R whuser:whuser /whuser/

USER whuser

ENV NODE_ENV production
RUN npx npm@6 ci --only=production

VOLUME ["/run"]
WORKDIR /whuser

ENTRYPOINT [ "node", "./server"]