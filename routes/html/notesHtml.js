const router = require('express').Router();
const FS = require('fs');

router.get('/', (req, res) => {
    let notes = FS.readFileSync('./public/index.html', "utf-8");
    res.send(notes);
});

router.get('/notes', (req, res) => {
    let notes = FS.readFileSync('./public/notes.html', "utf-8");
    res.write(notes);
});

module.exports = router;