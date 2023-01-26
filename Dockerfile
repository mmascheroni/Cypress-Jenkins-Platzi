FROM cypress/base:16

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install --legacy-peer-deps

RUN npm install @badeball/cypress-cucumber-preprocessor

RUN npm install --save-dev @babel/core @babel/preset-env babel-loader webpack

RUN npx cypress install

RUN $(npm bin)/cypress verify

CMD ["npm", "run", "allure:serve:docker"]