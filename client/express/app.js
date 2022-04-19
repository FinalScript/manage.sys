const express = require('express'); //Line 1
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const app = express(); //Line 2
const port = process.env.PORT || 443; //Line 3

dotenv.config();

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
