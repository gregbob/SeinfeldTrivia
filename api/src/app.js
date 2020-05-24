const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const routes = require('./routes');

// Remove CORS while developing
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/api', routes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('test', (value) => {
    console.log(value);
  });

  socket.on('addItem', (value) => {
    console.log(`added item ${value}`);
    io.emit('addItem', {
      message: value
    });
  })

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});