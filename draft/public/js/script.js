let diagramArr = []

const convertIdToPly = (id) => {
    return Number(id.match(/\d+/)) + 1;
}

const diagramSelectCheckbox = document.getElementById('diagram-select-checkbox')
const boardButton = document.getElementById('boardButton')

diagramSelectCheckbox.addEventListener('click', function() {
    let move = document.querySelector('.yellow').parentElement.id
    if (this.checked) {
        diagramArr.push(convertIdToPly(move))
        console.log(diagramArr)
    } else {
        diagramArr = diagramArr.filter(item => item != convertIdToPly(move))
        console.log(diagramArr)
    }
})

boardButton.addEventListener('click', () => {
    let move = document.querySelector('.yellow').parentElement.id
    if (diagramArr.includes(convertIdToPly(move))) {
        diagramSelectCheckbox.checked = true;
        console.log(diagramArr)
    } else {
        diagramSelectCheckbox.checked = false;
        console.log(diagramArr)
    }
})