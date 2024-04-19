const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const data = require('./data');

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send(data);
  res.send('App working');
  console.log(data);
});

app.get('/api/v1/data/:endpoint', (req, res) => {
  const endpoint = req.params.endpoint;
  const findEndpoint = data[endpoint];

  if (findEndpoint) {
    res.send(data[endpoint]);
  } else {
    res.status(404).json({ error: "Endpoint not found" });
  }
});

app.get('/api/v1/data/users/:id', (req, res) => {
  const id = req.params.id
  const findUser = data.users.find((user) => user.id === `${id}`)
  if (findUser) {
      const responseData = findUser
      res.json(responseData);
  } else {
      res.status(404).json({ error: "Endpoint not found" });
  }
});

app.get('/api/v1/random/affirmation', (req, res) => {
  const getRandomAffirmation = data.affirmations[Math.floor(Math.random() * data.affirmations.length)];
  res.json(getRandomAffirmation);
});

app.put('/api/v1/data/active_user', (req, res) => {
  const activeUser = req.body
  data.active_user = activeUser

  res.json({ message: `${activeUser} updated successfully`, updatedUser: data.active_user  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
