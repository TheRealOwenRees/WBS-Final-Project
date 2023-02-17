let diagramArr = []

const convertIdToPly = (id) => {
    return Number(id.match(/\d+/)) + 1;
}

const diagramSelectCheckbox = document.getElementById('diagram-select-checkbox')
const boardButton = document.getElementById('boardButton')

diagramSelectCheckbox.addEventListener('click', function() {
    let move = document.querySelector('.yellow').parentElement.id;
    let fen = document.getElementsByClassName('fen').boardFen.value;
    if (this.checked) {
        diagramArr.push({
            ply: convertIdToPly(move),
            fen: fen
        })
        console.log(diagramArr)
    } else {
        diagramArr = diagramArr.filter(item => item.ply != convertIdToPly(move))
        console.log(diagramArr)
    }
})

boardButton.addEventListener('click', () => {
    let move = document.querySelector('.yellow').parentElement.id
    if (diagramArr.some(item => item.ply === convertIdToPly(move))) {
        diagramSelectCheckbox.checked = true;
        console.log(diagramArr)
    } else {
        diagramSelectCheckbox.checked = false;
        console.log(diagramArr)
    }
})

// retrieve moves from chess board hidden text area
function getMoves()  {
    let pgnButton = document.getElementById('boardButtonpgn')
    pgnButton.click();
    let moves = document.getElementById('textpgnboardButton').innerHTML;
    if (!document.getElementById('moves')) {
      let movesInput = document.createElement('input');
      movesInput.setAttribute('type', 'hidden');
      movesInput.setAttribute('name', 'moves');
      movesInput.setAttribute('id', 'moves');
      movesInput.setAttribute('value', moves);
      document.getElementById('gameForm').appendChild(movesInput);
      let dataArrInput = document.createElement('input');
      dataArrInput.setAttribute('type', 'hidden');
      dataArrInput.setAttribute('name', 'diagramPly')
      dataArrInput.setAttribute('id', 'diagramPly')
      dataArrInput.setAttribute('value', JSON.stringify(diagramArr))
      document.getElementById('gameForm').appendChild(dataArrInput);
    } else {
      document.getElementById('moves').value=moves;
    }
    pgnButton.click();
    document.getElementById('gameForm').submit();
  }