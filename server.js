var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let ser = require('./service');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
session = {}

app.get('/startSession', async (req, res) => { 
  console.log('----------Start-----------')
  const check_session = req.cookies['session'];
  if(!check_session){
    session_data = await ser.startSession();
    session.id = session_data.data.entity.id;
    session.selfUri = session_data.data.entity.selfUri;
    session.clientToken = session_data.data.clientToken;
    res.cookie('session', session, {maxAge: 3600000});
    console.log('session create', session)
  }else{
    session = check_session
    console.log('Used session', session)
  }

  console.log('----------GET Message-----------')
  message_data = await ser.getMessage(session);
  messages = message_data.data.messages;
  console.log(messages)
  
  counter = 0;
  result = [];
  messages.forEach((val, index) => {
    if(val.type == 'Text'){
      result[counter] = {}
      result[counter].user = val.from.nickname;
      result[counter].text = val.text;
      counter++;
    }
  });
  res.send(result);
})

app.post('/sendMessage', async (req, res) => { 
  try {
    console.log('----------sendMessage-----------')
    message = req.body.message
    console.log(message);
    data = await ser.sendMessage(session, message);
    // console.log(session)
  } catch (error) {
    return console.log('error',error);
  } finally {
    console.log('Message Posted')
  }
})


io.on('connection', () =>{
  console.log('a user is connected')
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
