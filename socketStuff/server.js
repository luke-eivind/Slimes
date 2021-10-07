//Server Setup
var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(3000);
var globalName;
var players = [];
var currentTurn = 0;
var lastPlayer;
var currentBid;
var g;

const io = require('socket.io')(server, {
  ccors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});


app.use(express.static('public'));

console.log('server is running');

//var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('new connection', socket.id);
  io.sockets.emit('connectionReceived', 'connection received at server');
  /*
	socket.on('newPlayer', newName);
	socket.on('readyUp', allReady);
	//socket.on('makeBid', makeBid)

	function newName(data){
		players.push(new player(data,socket.id,socket));
	}

	function allReady(data){
		globalName = data;
		var person = players.find(findPersonByName);
		person.ready = true;
		console.log('checking');
		if(checkAllReady(players)){
			io.sockets.emit('starting',players.length);
			g = new game(players.length);
			lastPlayer = players.length-1;
			startGame(g);				//should we make startgame a method of game?
		}
	}*/

	//function makeBid(data)
}
