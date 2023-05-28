FROM nginx:1.21.3

WORKDIR /app/

COPY ./apps/social-network-frontend/nginx.conf /etc/nginx/sites-available/default

COPY ./dist/apps/social-network-frontend/ /app/build/
RUN cp -R build/* /usr/share/nginx/html

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
