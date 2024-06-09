import express from 'express';
const router = express.Router();

const links = /*html*/ `
<p>
  API root: <code>/api</code>
  <br />
  API routes: see documentation
</p>
<p>
  API documentation
  <ul>
    <li><a href="/public/swagger.json">OpenAPI specification</a></li>
    <li><a href="/api-docs">Swagger UI</a></li>
  </ul>
</p>
<p><a href="/public/app.html">Reference front-end app</a></p>
`;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(links);
});

export default router;
