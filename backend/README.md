# Prequisites
- nodejs 14+
- expressjs
- sequilize
- mysql

# Installation
- set environment variables using `export key=value` for environment in your command line 
    > required environment
    - DB_NAME
    - DB_USER
    - DB_PASS
    - DB_HOST
    > To use it type in your command line `export DB_NAME=testing-qc-db`
- run `npm install` or `yarn install`
- run `npm run migrate`
- run `npm run seeder`

# Development
- run `npm start`

# Documentation
- open `domain/api-docs` for swagger documentation or `http://localhost:8000/api-docs` when developing