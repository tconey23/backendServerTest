const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;
const data = require('./data');

// Enable CORS for all routes
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

app.put('/api/v1/data/active_user', (req, res) => {
    const activeUser = req.body
    data.active_user = activeUser
    res.json({
        message: `${activeUser} updated successfully`,
        updatedUser: data.active_user
    })
});

app.post('/api/v1/data/users/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    const dataKey = Object.keys(newData)
    const userIndex = data.users.findIndex(user => user.id === id);

    if (userIndex !== -1) {

        if (!data.users[userIndex][dataKey]) {
            data.users[userIndex][dataKey] = [];
        }
        const duplicateRecord = data.users[userIndex][dataKey].includes(newData[dataKey])
        if (!duplicateRecord) {
            data.users[userIndex][dataKey].push(newData[dataKey]);
            res.json({
                message: `${dataKey} updated successfully`,
                updatedUser: data.users[userIndex]
            })
        } else {
            res.json('Duplicate Record')
        }
    } else {
        res.status(404).json({
            error: "User not found"
        });
    }
});

app.delete('/api/v1/data/users/:id', (req, res) => {
    const id = req.params.id;
    const quote = Object.values(req.body)[0]
    const dataKey = Object.keys(req.body)
    const userIndex = data.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        let quoteIndex = data.users[userIndex][dataKey].findIndex(fav => fav.replace('"', '') === quote);
        let quoteIndex2
        data.users[userIndex][dataKey].forEach((fav, index) => {
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