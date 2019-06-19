const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./database/userController.js');
const managerController = require('./database/managerController.js');
const paymentRouter = require('./paymentRouter.js');
const encryptionController = require('./database/encryptionController.js');
/* Below is SocketIO stuff */
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../')));

// routes for multiple user types
app.post('/user',encryptionController.encryptPassword, userController.postUser, (req, res) => {
  res.status(200).json(res.locals.result);
});

app.post('/login', encryptionController.comparePassword, userController.login, (req, res) => {
  res.status(200).json(res.locals.result);
});

app.post('/event', userController.postEvent, (req, res) => {
  res.status(200).json({'msg': 'successfully posted to database'});
});

app.get('/event', userController.getEvent, (req,res)=>{
  res.status(200).json(res.locals.result);
});

app.delete('/event', managerController.deleteEvent, (req, res) => {
  res.status(200).json({'msg': 'event successfully deleted'});
});

// get message
app.get('/messages', userController.getMessages, (req, res) => {
  res.status(200).json(res.locals.result);
})
// post message
app.post('/messages', userController.postMessages, (req, res)=>{
  res.status(200).json(res.locals.result);
})

app.get('/allUsers', managerController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.result);
});

app.get('/allApartments', managerController.getAllApartments, (req, res) => {
  res.status(200).json(res.locals.result);
});

app.use('/payments', paymentRouter);

/** SOCKET IO **/
io.on('connection', function(socket) {
  console.log('the user is connected phosure');
  socket.on('disconnect', () => {
    console.log('user is disconnected phosure ')
  });

  socket.on('chat', (sentMessages) => {
    console.log('this is the msg from chat.js', sentMessages);
    /*    setting up query   */
    userController.socketDB(sentMessages)
    
    console.log('are we back out here fam?')
    io.emit('chat', sentMessages)
  });
  // io.on('chat', (sentMessages) => {
  //   console.log(sentMessages);
  //   io.emit('chat', sentMessages)
  // });
});



//error handling
app.use((req, res, next) => {
  console.log(err)
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) =>{
  console.log(err);
  res.status(400).json({'msg':err});
})

server.listen(3000);