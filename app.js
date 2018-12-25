const express = require('express')
const app = express()
const port = 3000

app.use(express.static('.'))
app.get('/', (req, res) => res.redirect('/tic_tac_toe.html'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
