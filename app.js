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
});

const port = 3000

http.listen(port, function () {
    console.log('listening on *:' + port);
});


app.use(express.static('.'))
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.redirect('/tic_tac_toe.html'))

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