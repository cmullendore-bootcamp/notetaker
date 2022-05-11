const Uuid = require("uuid");

class Note {
    constructor(id, title, content, createdOn, updatedOn) {
        this.Id = (id) ? id : Uuid.v4();
        this.Title = title;
        this.Content = content;
        this.CreatedOn = createdOn;
        this.UpdatedOn = updatedOn;
    }
}

module.exports = Note;