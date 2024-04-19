const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
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
  console.log("*********GET USERS*********",req.params)
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

app.post('/api/v1/data/users/:id', (req, res) => {
  console.log("*********POST USERS*PARAMS********",req.params)
  console.log("*********POST USERS*BODY********",req.body)
  const id = req.params.id;
  const newData = req.body;
  const dataKey = Object.keys(newData)
  const userIndex = data.users.findIndex(user => user.id === id);
  const userfind = data.users.find(user => user.id === id);

  console.log("*********POST USERS*USER********",data.users)
  console.log("*********POST USERS*USER*FIND*******",userfind)

  if (userIndex !== -1) {
      
      if (!data.users[userIndex][dataKey]) {
         data.users[userIndex][dataKey] = [];
      }
      const duplicateRecord =  data.users[userIndex][dataKey].includes(newData[dataKey])
      if(!duplicateRecord){
          data.users[userIndex][dataKey].push(newData[dataKey]);
          res.json({ message: `${dataKey} updated successfully`, updatedUser: data.users[userIndex] })
      }else {
          res.json('Duplicate Record')
      }
  } else {
      res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
