const express = require('express');
const app = express();

const fish_router = require('./routes/fish');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api', function (req, res) {
    res.status(200).json('API');
})

app.use("/fish", fish_router);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on ' + `http://localhost:${listener.address().port}/api`);
});
