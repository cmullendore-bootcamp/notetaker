const Express = require('express');
const FS = require('fs');

const app = Express();

app.get('/', (req, res) => {
    let notes = FS.readFileSync('./public/index.html', "utf-8");
    res.send(notes);
});

app.get('/notes', (req, res) => {
    let notes = FS.readFileSync('./public/notes.html', "utf-8");
    res.write(notes);
});

app.get('/api/notes', (req, res) => {
    let db = FS.readFileSync('./db/db.json', "utf-8");
    res.json(JSON.parse(db));
});


app.listen(process.env.PORT, () => {
    console.log(`API server now on port 3001!`);
});