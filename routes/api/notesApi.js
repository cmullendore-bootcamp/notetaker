const router = require('express').Router();
const FS = require('fs');
const Note = require('../../lib/Note');

const dbPath = "./db/db.json";
const enc = "utf-8"

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



router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {

    let noteId = Note.Find(notes, req.params.id)

    let note = notes[noteId];

    res.json(note);

});

router.post('/notes', (req, res) => {

    let json = req.body;

    let note = new Note(json["Title"], json["Text"]);

    notes.push(note);

    WriteNotes();

    res.json(note);

});

router.put('/notes/:id', (req, res) => {

    let noteId = Note.Find(notes, req.params.id)

    let note = Note.Parse(notes[noteId]);

    note.Update(req.body);

    notes[noteId] = note;

    WriteNotes();

    res.json(note);

});

router.delete('/notes/:id', (req, res) => {

    notes = notes.filter(note => note.Id != req.params.id);

    WriteNotes();

    res.status(200).end();

});

module.exports = router;