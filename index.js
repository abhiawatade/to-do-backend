const express = require("express");
const app = express();
const port = 1338;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`server is listening to the ${port} port`);
});
