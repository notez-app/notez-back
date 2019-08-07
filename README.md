<h1 align="center">notez-back 💻</h1>
<p>
  <a href="https://github.com/talyssonoc/notez-back/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> TODO: Write a project description

### 🏠 [Homepage](https://github.com/talyssonoc/notez-back)

## Install

```sh
yarn
```

## Setup

Create your Sequelize config file based on the example config.

```sh
cp packages/notez-infra/sequelize/{config.example.js,config.js}
```

Then run the setup command to create and run the database migrations. **Don't forget** to have your database started as described on the next section.

```sh
yarn db:setup
```

## Run

First run Docker Compose file to start the database.

```sh
docker-compose up -d
```

Then run the development server.

```sh
yarn dev
```

## Test

```sh
yarn test
```

## Contributing

> TODO: Write contribution guidelines

## 📝 License

This project is [MIT](https://github.com/talyssonoc/notez-back/blob/master/LICENSE) licensed.
