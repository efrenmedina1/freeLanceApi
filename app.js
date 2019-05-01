require('dotenv').config();

var express = require('express');
var app = express();

var sequelize = require('./db').sequelize;
var bodyParser = require('body-parser');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(bodyParser.json());

//Controllers
var user = require('./controllers/userController');
var month = require('./controllers/monthController');
var monthlist = require('./controllers/monthlistController');
var profilelist = require('./controllers/profilelistController'); 
var profile = require('./controllers/profileController');
var conversation = require('./controllers/conversation');
var conversationlist = require('./controllers/conversationlistController');
var message = require('./controllers/messageController');
var messagelist = require('./controllers/messagelistController');
var event = require('./controllers/eventController');
var eventlist = require('./controllers/eventlistController');

//EXPOSED ROUTES//
app.use('/user', user);

app.use('/profilelist', profilelist);
app.use('/conversationlist', conversationlist);
app.use('/messagelist', messagelist);
app.use('/monthlist', monthlist);
app.use('/eventlist', eventlist);

//PROTECTED ROUTES//
app.use(require('./middleware/validate-session'));
app.use('/month', month);
app.use('/profile', profile);
app.use('/conversation', conversation);
app.use('/message', message);
app.use('/event', event);



app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})