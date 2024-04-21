const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;
const data = require('./data');

app.use(cors());

app.get('/', (req, res) => {
    res.send(data);
    res.send('App working');
});

app.get('/api/v1/data/:endpoint', (req, res) => {
    const endpoint = req.params.endpoint;
    const findEndpoint = data[endpoint];
    if (findEndpoint) {
        res.send(data[endpoint]);
    } else {
        res.status(404).json({
            error: "Endpoint not found"
        });
    }
});

app.get('/api/v1/data/users/:id/messages', (req, res) => {
    const id = req.params.id
    const findUser = data.users.find((user) => user.id === `${id}`)
    if (findUser) {
        const responseData = findUser.messages
        res.json(responseData);
    } else {
        res.status(404).json({
            error: "Endpoint not found"
        });
    }
});

app.get('/api/v1/random/affirmation', (req, res) => {
    const getRandomAffirmation = data.affirmations[Math.floor(Math.random() * data.affirmations.length)];
    res.json(getRandomAffirmation);
});

app.post('/api/v1/data/active_user', (req, res) => {
    const activeUser = req.body
    data.active_user = activeUser
    res.json({
        message: `${activeUser} updated successfully`,
        updatedUser: data.active_user
    })
});

app.post('/api/v1/data/users/:userId/', (req, res) => {
  const userId = req.params.userId;
  const newFavoriteQuote = Object.values(req.body)[0];

  try {
    const user = data.users.find(user => user.id === userId);
    
    if (!user) {
      const ret = res.status(404).json({ error: `User with ID ${userId} not found` });
      return ret
    }
    const isDuplicate = user['messages'].some(quote => quote === newFavoriteQuote);
    if (isDuplicate) {
      return res.status(400).json({ error: "Duplicate favorite quote" });
    }

    // Push the new favorite quote if it's not a duplicate
    user['messages'].push(newFavoriteQuote);
    res.json(user);
  } catch (error) {
    console.error("There was a problem adding the favorite quote:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete('/api/v1/data/users/:userId/messages/', (req, res) => {
  try {
    const userId = parseInt(req.params.userId); 
    const messageId = parseInt(req.body.msgId); 

    console.log(typeof messageId)

    const user = data.users.find((user) => user.id == userId)
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: `User with ID ${userId} not found` });
    }

    const index = user.messages.findIndex(message => message.id === messageId);
    user.messages.forEach((msg) => console.log(msg.id))
    if (index !== -1) {
      user.messages.splice(index, 1);
      res.json(user);
    } else {
      res.status(404).json({ error: `Message with ID ${messageId} not found` });
    }
  } catch (error) {
    console.error("There was a problem deleting the message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});