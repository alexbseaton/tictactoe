const socket = io()

socket.on('button press', event => {
    console.log('client got message from server', event)
    handleClick(event.id, event.player, true)
})

socket.on('reset', () => reset())

const handleClick = (id, p, suppressEmit) => {
    const player = p ? p : document.getElementById('player').innerHTML
    const button = document.getElementById(id)

    console.log('id is ', id)
    const msg = {
        id: id,
        player: player
    }

    if (!suppressEmit)
        socket.emit('button press', msg)

    button.innerHTML = player
    button.disabled = true
    checkForWin()
    checkForDraw()
    document.getElementById('player').innerHTML = player === 'X' ? 'O' : 'X'
}


const checkForDraw = () => {
    buttons = document.getElementsByTagName('button')

    // Can't be drawn if there's a gap
    console.log('buttons is, ', buttons)
    for (button of buttons) {
        console.log(button.innerHTML)
        if (!['X', 'O'].includes(button.innerHTML))
            return
    }

    // It's a draw
    var para = document.createElement("p")
    var node = document.createTextNode("Game is drawn.")
    para.appendChild(node)

    var element = document.getElementById('result')
    element.appendChild(para)

    disableEverything()

    drawPlayAgain()
}


const checkForWin = () => {
    const lines = [
        ['00', '01', '02'],
        ['10', '11', '12'],
        ['20', '21', '22'],
        ['00', '10', '20'],
        ['01', '11', '21'],
        ['02', '12', '22'],
        ['00', '11', '22'],
        ['02', '11', '20']
    ]
    for (line of lines) {
        console.log('line is, ', line)
        if (isLineWinning(line)) {
            handleWin()
            return
        }
    }
}


const disableEverything = () => {
    // Disable the remaining buttons
    buttons = document.getElementsByTagName('button')
    for (button of buttons) {
        button.disabled = true
    }
}


const handleWin = () => {
    const player = document.getElementById('player').innerHTML

    // Update score
    const currentScore = document.getElementById(`${player}_score`)
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 1

    // Show winner
    var para = document.createElement("p")
    var node = document.createTextNode(`Player with ${player}'s won.`)
    para.appendChild(node)

    var element = document.getElementById('result')
    element.appendChild(para)

    disableEverything()
    drawPlayAgain()
}


const reset = (event) => {
    if (!event) {
        console.log('emitting reset event')
        socket.emit('reset')
    }

    const buttons = document.getElementsByClassName('square')
    for (button of buttons) {
        button.disabled = false
        button.innerHTML = ''
    }

    const res = document.createElement('div')
    res.id = 'result'
    document.getElementById('result').replaceWith(res)

    document.getElementById('player').innerHTML = 'X'
}


const drawPlayAgain = () => {
    var para = document.createElement("button")
    para.className = 'playAgain'
    para.id = 'play_again'
    para.addEventListener("click", reset, false)
    var node = document.createTextNode(`Play again?`)
    para.appendChild(node)

    var element = document.getElementById('result')
    element.appendChild(para)
}


const isLineWinning = (line) => {
    return ['X', 'O'].includes(document.getElementById(line[0]).innerHTML) &&
        document.getElementById(line[0]).innerHTML === document.getElementById(line[1]).innerHTML &&
        document.getElementById(line[1]).innerHTML === document.getElementById(line[2]).innerHTML
}