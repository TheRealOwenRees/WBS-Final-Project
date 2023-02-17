let diagramArr = []

const convertIdToPly = (i) => {
    return i + 1;
}

const diagramSelectCheckbox = document.getElementById('diagram-select-checkbox')
const boardButton = document.getElementById('boardButton')

// collect all 'sans' tags except those with a grand-parent class of 'variation'
let sans = document.querySelectorAll('san')
sans = [...sans].filter(s => s.parentNode.parentNode.className != 'variation')

diagramSelectCheckbox.addEventListener('click', function () {
    let index = sans.findIndex(s => s.className === 'yellow')
    let fen = document.getElementsByClassName('fen').boardFen.value;
    if (this.checked) {
        diagramArr.push({
            ply: convertIdToPly(index),
            fen: fen
        })
        console.log(diagramArr)
    } else {
        diagramArr = diagramArr.filter(item => item.ply != convertIdToPly(index))
        console.log(diagramArr)
    }
})

boardButton.addEventListener('click', () => {
    let index = document.querySelector('.yellow').parentElement.id
    if (diagramArr.some(item => item.ply === convertIdToPly(index))) {
        diagramSelectCheckbox.checked = true;
        console.log(diagramArr)
    } else {
        diagramSelectCheckbox.checked = false;
        console.log(diagramArr)
    }
})

// retrieve moves from chess board hidden text area
function getMoves() {
    let pgnButton = document.getElementById('boardButtonpgn')
    pgnButton.click();
    let moves = document.getElementById('textpgnboardButton').innerHTML;
    if (!document.getElementById('moves')) {
        // add moves to hidden field
        let movesInput = document.createElement('input');
        movesInput.setAttribute('type', 'hidden');
        movesInput.setAttribute('name', 'moves');
        movesInput.setAttribute('id', 'moves');
        movesInput.setAttribute('value', moves);
        document.getElementById('gameForm').appendChild(movesInput);
        // add diagram ply/FEN object to hidden field - after sorting in ply order
        diagramArr.sort((a, b) => a.ply - b.ply)
        let dataArrInput = document.createElement('input');
        dataArrInput.setAttribute('type', 'hidden');
        dataArrInput.setAttribute('name', 'diagramPly')
        dataArrInput.setAttribute('id', 'diagramPly')
        dataArrInput.setAttribute('value', JSON.stringify(diagramArr))
        document.getElementById('gameForm').appendChild(dataArrInput);
    } else {
        document.getElementById('moves').value = moves;
    }
    pgnButton.click();
    document.getElementById('gameForm').submit();
}