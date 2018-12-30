const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('button press', msg => {
        console.log('button was pressed', msg)
        socket.broadcast.emit('button press', msg)
    })
    socket.on('reset', msg => {
        console.log('reset signal received')
        socket.broadcast.emit('reset', {
            room: msg.room
        })
    })
});

const port = 3000

http.listen(port, () => {
    console.log('listening on *:' + port);
});


app.use(express.static('.'))
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.redirect('/index.html'))

app.get('/room=:room', (req, res) => {
    console.log('Request sent to room', req.params.room)
    res.sendFile('./tic_tac_toe.html', {
        root: __dirname
    })
})

app.post('/tic_tac_toe.html', (req, res) => {
    const user_name = req.body.user_name
    console.log(user_name)
    fs.readFile('./users.json', (err, oldJson) => {
        const old = JSON.parse(oldJson)
        if (old[user_name]) {
            old[user_name] += 1
        } else {
            old[user_name] = 1
        }
        fs.writeFile('./users.json', JSON.stringify(old), (err) => console.log(err))
    })
    res.redirect('/tic_tac_toe.html')
})