FROM node:lts AS build

WORKDIR /app

COPY package*.json ./

# Need to remove --force after resolving react-fade-in dependency issue
RUN npm install --force

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]