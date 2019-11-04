FROM navikt/node-express:1.0.0

ENV APPLICATION_NAME=sykdom-i-familien
ENV PORT=8080
COPY . .

RUN ls -la

CMD npm run serve

EXPOSE $PORT