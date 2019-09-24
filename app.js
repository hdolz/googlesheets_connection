// API Rest para conexão com Google SpreadSheet API 
const express = require('express');
const GoogleSpreadSheet = require('google-spreadsheet');
const { promisify } = require('util');
const bodyParser = require('body-parser');
const creds = require('./credenciais.json');

const app = express();
const PORT = 5000;
const SHEET_ID = '1BjVQnZsan3PnRZK5HyThB1-UmnrpT8XuHA9Vgv7VGn0';

//middleware do body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Index');
});

app.post('/inserir', (req, res) => {
    (async function inserirDados() {
        const doc = new GoogleSpreadSheet(SHEET_ID);
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];
        await promisify(sheet.addRow)({
            // Nome: req.body.Nome,
            // Area: req.body.Area,
            // Curso: req.body.Curso
            Nome: req.body.Nome,
            Email: req.body.Email,
            DtNasc: req.body.DtNasc,
            Interesse: req.body.Interesse
        });
        res.send('Dados inseridos com sucesso!');
    })()
});

app.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
});