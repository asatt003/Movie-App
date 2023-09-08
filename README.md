# Movie-App
Mini full-stack application. 

Steps to run:

1. Make Postgres Docker container.
2. Connect to container.
3. Log in as postgres.
4. Create movies_09_08_23
5. run npx knex migrate:latest from database directory
6. run npx knex seed:run from database directory
7. run 'npm start' in the server directory
8. New terminal, then run npm start in the client directory

Side Note: 

1. Run 'npm run view' in the server directory to view the movies table