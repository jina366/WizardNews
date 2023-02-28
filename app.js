const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const postList = require("./views/postList")
const postDetails = require("./views/postDetails")

const app = express();

app.use(morgan("dev"));
app.use(express.static( "public"));

app.get('/', (req, res) => {
  const posts = postBank.list();
  res.send(postList(posts))
});

app.get('/posts/:id', (req, res) => {
  const post = postBank.find(req.params.id)
  res.send(postDetails(post));
});

app.use((error, req, res, next) => {
  res.status(404).send({
    error: "404 - not found",
    message: "no route found for the request url",
  });
});

const { PORT = 1337 } = process.env;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
