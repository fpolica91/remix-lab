FROM node:16-alpine
WORKDIR /usr/server/app

COPY ./package.json ./
RUN npm install
COPY ./ .

RUN npx prisma generate
RUN npm run build
ENV NODE_ENV=production
CMD ["npm", "run" ,"dev"] # will launch the remix app when we run this Docker image.