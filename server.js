const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const data = require('./data')

app.get('/', (req, res) => {
  res.send(data)
  res.send('App working');
  console.log(data)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
