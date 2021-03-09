FROM nginx

COPY fillConfig.sh /scripts/fillConfig.sh
RUN chmod +x /scripts/fillConfig.sh
EXPOSE 9003

RUN mkdir /app

COPY /ITLab-Reports-Front /app

COPY nginx.conf /etc/nginx/nginx.conf