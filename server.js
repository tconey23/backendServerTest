const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
const data = require('./data')

app.get('/', (req, res) => {
  res.send('Hello, World!');
  res.json(data)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
