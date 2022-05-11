const Uuid = require("uuid");

class Note {
    constructor(title, content) {
        this.Id = Uuid.v4();
        this.Title = title;
        this.Text = content;
        this.CreatedOn = Date.now();
        this.UpdatedOn = Date.now();
    }

    Update(jsonData) {

        if (jsonData["Title"]) {

            this.Title = jsonData["Title"];
        }

        if (jsonData["Text"]) {

            this.Text = jsonData["Text"];
        }

        this.UpdatedOn = Date.now();
    }

    static Parse(jsonData) {
        let note = new Note(null, null);

        note.Id = jsonData["Id"];
        note.Title = jsonData["Title"];
        note.Content = jsonData["Text"];
        note.CreatedOn = jsonData["CreatedOn"];
        note.UpdatedOn = jsonData["UpdatedOn"];

        return note;
    }

    static Find(notes, id) {
        for (let i in notes) {
            if (notes[i].Id == id) {
                return i;
            }
        }

        return null;
    }
}

module.exports = Note;