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

app.get('/api/v1/data/users/:id', (req, res) => {
    const id = req.params.id
    const findUser = data.users.find((user) => user.id === `${id}`)
    if (findUser) {
        const responseData = findUser
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

app.post('/api/v1/data/users/:id', (req, res) => {
  console.log(req.body)
  console.log(req.params)
  try {
    const id = req.params.id;
    const { favorite } = req.body;
    const quote = Object.values(favorite)[0]; // Extracting the quote from the object
    // Remaining logic to add the favorite quote to the user's data
  } catch (error) {
    console.error("There was a problem adding the favorite quote:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete('/api/v1/data/users/:id', (req, res) => {
    const id = req.params.id;
    const quote = Object.values(req.body).toString()
    const dataKey = Object.keys(req.body)
    const userIndex = data.users.findIndex(user => user.id === id);
    console.log(id, quote, dataKey, userIndex)
    if (userIndex !== -1) {
        let quoteIndex = data.users[userIndex][dataKey].findIndex(fav => fav.trim() === quote.trim());
        let quoteIndex2
        data.users[userIndex][dataKey].forEach((fav, index) => {
          console.log(fav.trim(), quote.trim())
            if (fav === quote) {
                quoteIndex2 = index
                return
            } {
                console.log('NO MATCH')   
            }
        })
        quoteIndex === -1 && quoteIndex2 ? quoteIndex = quoteIndex2 : console.log('quoteindex is a valid index');
        if (quoteIndex !== -1) {
            data.users[userIndex]["favorite quotes"].splice(quoteIndex, 1);
            res.status(200).json({
                message: `${quote} deleted successfully`,
                "favorite quotes": data.users[userIndex]["favorite quotes"]
            });
        } else {
            res.status(404).send({
                message: "Quote not found."
            });
        }
    } else {
        res.status(404).send({
            message: "User not found."
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});