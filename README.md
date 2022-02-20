<p align="center">
  <a href="https://github.com/redasalmi/jsonplaceholder-graphql/graphs/contributors"> 
    <img src="https://img.shields.io/github/contributors/redasalmi/jsonplaceholder-graphql.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/redasalmi/jsonplaceholder-graphql/network/members"> 
    <img src="https://img.shields.io/github/forks/redasalmi/jsonplaceholder-graphql.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/redasalmi/jsonplaceholder-graphql/stargazers"> 
    <img src="https://img.shields.io/github/stars/redasalmi/jsonplaceholder-graphql.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/redasalmi/jsonplaceholder-graphql/blob/main/LICENSE"> 
    <img src="https://img.shields.io/github/license/redasalmi/jsonplaceholder-graphql.svg?style=for-the-badge" />
  </a>
</p>

<br />
<p align="center">
  <h3 align="center">{JSON} Placeholder GraphQL</h3>
  <p align="center">
    A graphql version of the {JSON} Placeholder API
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

This is a GraphQL version of the {JSON} Placeholder Rest API found here: [jsonplaceholder-api](https://jsonplaceholder.typicode.com/). the app aims to reproduce the same API in GarphQL, it can be found online at this address: [jsonplaceholder-graphql](https://jsonplaceholder-graphql.onrender.com/).

### Built With

- [Fastify](https://www.fastify.io/)
- [Mercurius](https://mercurius.dev/)
- [TypeGraphQL](https://typegraphql.com/)
- [Altair GraphQL Client](https://altair.sirmuel.design/)
- [prisma](https://www.prisma.io/)

## Getting Started

### Prerequisites

- node
- npm

### Installation

1. Clone the repository

```sh
  git clone https://github.com/redasalmi/jsonplaceholder-graphql.git
```

2. Install project dependencies

```sh
  npm install
```

3. Create `.env` file in the roor directory and fill the `DATABASE_URL` env variable

```sh
  DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

4. Prepare a PostgreSQL database (optionnaly using docker)

```sh
  docker-compose up -d                # to start the database container if using docker
  npx prisma generate                 # to load env variables into prisma
  npx prisma migrate deploy           # to apply migrations
  npx prisma db seed                  # to fill database data
```

## Usage

To start the server in development mode

```sh
  docker-compose up -d                # if using docker
  npm run dev
```

To start the server in production mode

```sh
  docker-compose up -d                # if using docker
  npm run build
  npm run start
```

To check database data

```sh
  npm run studio
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
