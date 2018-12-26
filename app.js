const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = 3000

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }));

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
}
)


app.listen(port, () => console.log(`App listening on port ${port}!`))
