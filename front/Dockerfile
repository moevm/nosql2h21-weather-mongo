FROM node:12

WORKDIR /home/app
COPY . .

RUN npm install yarn
RUN yarn install 

CMD [ "yarn","start" ]