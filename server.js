const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;
const data = require('./data');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // next();
});


app.get('/', (req, res) => {
  if(!req.ok){
    res.status.json()
  } else {
  res.send(data)
  }
});

// app.get('/api/v1/data/:endpoint', (req, res) => {
//   const endpoint = req.params.endpoint
//   const findEndpoint = data[endpoint]

//   if(findEndpoint){
//     res.send(data[endpoint]);
//   }  else {
//     res.status(404).json({ error: "Endpoint not found" });
//   }
// });

// app.get('/api/v1/random/affirmation', (req, res) => {
//   const getRandomAffirmation = data.affirmations[Math.floor(Math.random() * data.affirmations.length)]
//   res.json(getRandomAffirmation)
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
