const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userController = require('./database/userController.js');
const managerController = require('./database/managerController.js');
const paymentRouter = require('./paymentRouter.js');
const encryptionController = require('./database/encryptionController.js');
const tokenController = require('./tokenController.js');
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../')));

app.get('/verifyToken', tokenController.checkToken, (req, res) => {
  res.send(req.token);
});

// routes for multiple user types
app.post('/user',encryptionController.encryptPassword, userController.postUser, (req, res) => {
  res.status(200).json(res.locals.result);
});

app.post('/login', encryptionController.comparePassword, userController.login, tokenController.signToken, (req, res) => {
  res.cookie('token', res.locals.token, {httpOnly: true});
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
  /**Not Rooom **/
  socket.on('unjoin', (lastRoom)=> {
    socket.leave(lastRoom);
  });

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('chat', (sentMessages, roomId) => {
    /*    setting up query   */
    userController.socketDB(sentMessages);
    
    io.to(roomId).emit('chat', sentMessages);
    console.log('room: ', roomId);

  });
});

app.get('/*', (req, res) => {   
  res.sendFile(path.join(__dirname, '../index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
});

//error handling
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) =>{
  console.log(err);
  res.status(400).json({'msg':err});
})

server.listen(3000);