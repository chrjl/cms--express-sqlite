# CMS built on Express and SQLite

A simple REST API-driven content management system built on Express and backed with SQLite, utilizing `node-sqlite3` and raw SQL queries.

Includes a static reference frontend written in plain HTML and JavaScript.

## Usage

### Run a dev server using `nodemon` and `ts-node`

```
npm run dev
```

Nodemon detects files with `.ts` extension and automatically runs `ts-node`[^1]. The Express server can be accessed at `localhost:3000`.

- API root: `localhost:3000/api`
- API documentation: `localhost:3000/api-docs`
- Front-end app: `localhost:3000/public/app.html`

[^1]: <https://stackoverflow.com/a/64175239>

> [!NOTE]
>
> The included Docker compose file runs the dev script in a `node:lts-slim` container. The dev server is still accessed at port 3000.
>
> ```
> docker compose up dev
> ```

### Run a demo dev server on StackBlitz

💻 [Try it out](https://stackblitz.com/~/github.com/chrjl/cms--express-sqlite)

The sample database (`.db/db.sqlite`) will be loaded non-persisting (changes will be discarded when the project is reloaded). Stackblitz runs the `dev` script by default[^2] and supports read and write operations on SQLite[^3].

[^2]: https://developer.stackblitz.com/platform/webcontainers/project-config#startcommand
[^3]: https://blog.stackblitz.com/posts/introducing-sqlite3-webcontainers-support/

### Build and run

In progress...
