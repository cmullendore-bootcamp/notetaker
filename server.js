const Express = require('express');
const FS = require('fs');
const uuid = require("uuid");
const Note = require('./lib/Note');

/* class Note {
    constructor(id, title, content, createdOn, updatedOn) {
        this.Id = (id) ? id : uuid.v5.DNS;
        this.Title = title;
        this.Content = content;
        this.CreatedOn = createdOn;
        this.UpdatedOn = updatedOn;
    }
} */

const app = Express();

let note = new Note(null, "title1", "content1", "createdOn1", "updatedOn1");

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
    console.log(`API server running!`);
});