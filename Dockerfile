FROM node:lts AS build

ARG REACT_APP_USER_API_URL
ARG REACT_APP_SURVEY_API_URL
ARG REACT_APP_POST_API_URL
ARG REACT_APP_AI_API_URL

ENV REACT_APP_USER_API_URL=$REACT_APP_USER_API_URL
ENV REACT_APP_SURVEY_API_URL=$REACT_APP_SURVEY_API_URL
ENV REACT_APP_POST_API_URL=$REACT_APP_POST_API_URL
ENV REACT_APP_AI_API_URL=$REACT_APP_AI_API_URL

WORKDIR /app

COPY package*.json ./

# Need to remove --force after resolving react-fade-in dependency issue
RUN npm install --force

COPY . .

RUN npm run build

FROM nginx:stable

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
