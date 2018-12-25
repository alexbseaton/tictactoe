

function handleClick(button) {
    player = document.getElementById('player')
    button.innerHTML = player.innerHTML
    button.disabled = true
    checkForWin()
    checkForDraw()
    player.innerHTML = player.innerHTML === 'X' ? 'O' : 'X'
}


function checkForDraw() {
    buttons = document.getElementsByTagName('button')

    // Can't be drawn if there's a gap
    console.log('buttons is, ', buttons)
    for (button of buttons) {
        console.log(button.innerHTML)
        if (!['X', 'O'].includes(button.innerHTML))
            return
    }

    var para = document.createElement("p")
    var node = document.createTextNode("Game is drawn.")
    para.appendChild(node)

    var element = document.getElementById('result')
    element.appendChild(para)

    disableEverything()

    drawPlayAgain()
}


function checkForWin() {
    const lines = [
        ['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22'],
        ['00', '10', '20'], ['01', '11', '21'], ['02', '12', '22'],
        ['00', '11', '22'], ['02', '11', '20']
    ]
    for (line of lines) {
        console.log('line is, ', line)
        if (isLineWinning(line)) {
            handleWin()
            return
        }
    }
}


function disableEverything() {
    // Disable the remaining buttons
    buttons = document.getElementsByTagName('button')
    for (button of buttons) {
        button.disabled = true
    }
}


function handleWin() {
    const player = document.getElementById('player').innerHTML

    // Show winner
    var para = document.createElement("p")
    var node = document.createTextNode(`Player with ${player}'s won.`)
    para.appendChild(node)

    var element = document.getElementById('result')
    element.appendChild(para)

    disableEverything()
    drawPlayAgain()
}


function reset() {
    const buttons = document.getElementsByTagName('button')
    for (button of buttons) {
        button.disabled = false
        button.innerHTML = ''
    }

    const res = document.createElement('div')
    res.id = 'result'
    document.getElementById('result').replaceWith(res)

    document.getElementById('player').innerHTML = 'X'
}


function drawPlayAgain() {
    var para = document.createElement("button")
    para.className = 'playAgain'
    para.id = 'play_again'
    para.addEventListener("click", reset, false)
    var node = document.createTextNode(`Play again?`)
    para.appendChild(node)

    var element = document.getElementById('result')
    element.appendChild(para)
}


function isLineWinning(line) {
    return ['X', 'O'].includes(document.getElementById(line[0]).innerHTML) &&
        document.getElementById(line[0]).innerHTML === document.getElementById(line[1]).innerHTML &&
        document.getElementById(line[1]).innerHTML === document.getElementById(line[2]).innerHTML
}