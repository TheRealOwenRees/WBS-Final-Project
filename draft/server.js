const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileupload = require('express-fileupload');
const stream = require('stream');
const pgn2tex = require('./public/js/pgn2tex.js')
const latex = require('node-latex')
const strStream = require('string-to-stream')

const app = express();
const port = 5000;

// template engine EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/game', (req, res) => {
  const initialConfig = {
    width: '300px',
    resizable: false,
    position: 'start',
    showCoords: false,
    orientation: 'white',
    theme: 'default',
    pieceStyle: 'wikipedia',
    figurine: '',
    locale: 'en',
    timerTime: '',
    layout: 'top',
    showFen: false,
    coordsInner: true,
    headers: false,
    coordsFactor: '1.0',
    coordsFontSize: '',
    colorMarker: '',
    startPlay: '',
    hideMovesBefore: true,
    notation: 'short',
    notationLayout: 'inline',
  };
  res.render('game', {
    config: initialConfig,
    event: '',
    site: '',
    date: '',
    round: '',
    white: '',
    black: '',
    result: '',
    eco: '',
    whiteElo: '',
    blackElo: '',
    plyCount: '',
    eventDate: '',
    source: '',
  })
});

app.post('/game', (req, res) => {

  // create a PGN file in string format, ready to write/convert
  const createPgnString = (data) => {
    return (
      `[Event "${data.event}"]
[Site "${data.site}"]
[Date "${data.date}"]
[Round "${data.round}"]
[White "${data.white}"]
[Black "${data.black}"]
[Result "${data.result}"]
[ECO "${data.eco}"]
[WhiteElo "${data.whiteElo}"]
[BlackElo "${data.blackElo}"]
[PlyCount "${data.plyCount}"]
[EventDate "${data.eventDate}"]
[Source "${data.source}"]

${data.moves}`
    )
  }

  // save loaded game as PGN
  if (req.body.action === 'savepgn') {
    const pgnString = createPgnString(req.body)

    let fileContents = Buffer.from(pgnString, 'utf-8');
    let readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', 'attachment; filename=' + 'game.pgn');
    res.set('Content-Type', 'text/plain');

    readStream.pipe(res);
    readStream.end()
  }

  // save loaded game as PDF
  if (req.body.action === 'savepdf') {
    const pgnString = createPgnString(req.body)
    const diagrams = JSON.parse(req.body.diagramPly)
    console.log(diagrams)
    const texFile = pgn2tex(pgnString, diagrams)
    // const input = fs.createReadStream('input.tex')
    const input = strStream(texFile)
    // const output = fs.createWriteStream('output.pdf')
    const pdf = latex(input)
    // const pdf = pdflatex(input)

    // pdf.pipe(output)
    pdf.pipe(res)
    pdf.on('error', err => console.error(err))
    pdf.on('finish', () => console.log('PDF generated!'))
  }

  // load game and split PGN
  if (req.body.action === 'loadpgn') {
    try {
      const pgnData = req.files.pgnfile.data.toString()
      const pgnHeader = pgnData.split(/\n\n/g)[0]
      const event = pgnHeader.match(/(?<=Event.").*(?=")/)[0]
      const site = pgnHeader.match(/(?<=Site.").*(?=")/)[0]
      const date = pgnHeader.match(/(?<=Date.").*(?=")/)[0]
      const round = pgnHeader.match(/(?<=Round.").*(?=")/)[0]
      const white = pgnHeader.match(/(?<=White.").*(?=")/)[0]
      const black = pgnHeader.match(/(?<=Black.").*(?=")/)[0]
      const result = pgnHeader.match(/(?<=Result.").*(?=")/)[0]
      const eco = pgnHeader.match(/(?<=ECO.").*(?=")/)[0]
      const whiteElo = pgnHeader.match(/(?<=WhiteElo.").*(?=")/)[0]
      const blackElo = pgnHeader.match(/(?<=BlackElo.").*(?=")/)[0]
      const plyCount = pgnHeader.match(/(?<=PlyCount.").*(?=")/)[0]
      const eventDate = pgnHeader.match(/(?<=EventDate.").*(?=")/)[0]
      const source = pgnHeader.match(/(?<=Source.").*(?=")/)[0]
      const loadedConfig = {
        width: '300px',
        resizable: false,
        position: 'start',
        showCoords: false,
        orientation: 'white',
        theme: 'default',
        pieceStyle: 'wikipedia',
        figurine: '',
        locale: 'en',
        timerTime: '',
        layout: 'top',
        showFen: true,
        coordsInner: true,
        headers: true,
        coordsFactor: '1.0',
        coordsFontSize: '',
        colorMarker: '',
        startPlay: '',
        hideMovesBefore: true,
        notation: 'short',
        notationLayout: 'inline',
        pgn: pgnData,
      }
      res.render('game', {
        config: loadedConfig,
        event: event,
        site: site,
        date: date,
        round: round,
        white: white,
        black: black,
        result: result,
        eco: eco,
        whiteElo: whiteElo,
        blackElo: blackElo,
        plyCount: plyCount,
        eventDate: eventDate,
        source: source,
      })
    }
    catch (err) {  // handle this error more gracefully. Send an error message.
      res.redirect('/game')
    }
  }
});

// http error response codes
app.use((req, res) => res.status(404).send('404'))
app.use((req, res) => res.status(500).send('500'))

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
