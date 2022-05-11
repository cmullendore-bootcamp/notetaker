const { response } = require('express');
const Express = require('express');
const FS = require('fs');
const uuid = require("uuid");
const Note = require('./lib/Note');

const dbPath = "./db/db.json";
const enc = "utf-8"

const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));
app.use(Express.json());

let notes;
if (FS.existsSync(dbPath)) {
    notes = JSON.parse(FS.readFileSync(dbPath, enc));
}
if (!notes) {
    notes = [];
    WriteNotes();
}

function WriteNotes() {
    FS.writeFileSync(dbPath, JSON.stringify(notes));
}

app.get('/', (req, res) => {
    let notes = FS.readFileSync('./public/index.html', "utf-8");
    res.send(notes);
});

app.get('/notes', (req, res) => {
    let notes = FS.readFileSync('./public/notes.html', "utf-8");
    res.write(notes);
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {

    let noteId = Note.Find(notes, req.params.id)

    let note = notes[noteId];

    res.json(note);

});

app.post('/api/notes', (req, res) => {

    let json = req.body;

    let note = new Note(json["Title"], json["Text"]);

    notes.push(note);

    WriteNotes();

    res.json(note);

});

app.put('/api/notes/:id', (req, res) => {

    let noteId = Note.Find(notes, req.params.id)

    let note = Note.Parse(notes[noteId]);

    note.Update(req.body);

    notes[noteId] = note;

    WriteNotes();

    res.json(note);

});

app.delete('/api/notes/:id', (req, res) => {

    notes = notes.filter(note => note.Id != req.params.id);

    WriteNotes();

    res.status(200).end();

});

app.listen(process.env.PORT, () => {
    console.log(`API server running!`);
});