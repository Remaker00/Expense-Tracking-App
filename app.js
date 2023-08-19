const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const route = require('./routes/route');
const { sequelize } = require('./dataB');

app.use(bodyParser.json());
app.use(express.static('views'));

app.use('/exp', route);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log(`App started`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
