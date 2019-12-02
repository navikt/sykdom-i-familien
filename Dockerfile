FROM node:12

ENV APPLICATION_NAME=sykdom-i-familien
ENV PORT=8080
COPY . .

RUN ls -la

CMD npm run start-express

EXPOSE ${PORT}