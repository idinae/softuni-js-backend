const fs = require('fs');
const {
    promisify
} = require('util'); //вместо да се подава като втори аргумент function(err, data) {} --> .then(), т.е. прави промиси

const writeFile = promisify(fs.writeFile);

module.exports = class BaseModel {
    constructor(filePath) {
        this._filePath = filePath;
        this.entries = require(filePath); //тук ще се парсват в json записите от файла database.json
        const lastEntry = this.entries[this.entries.length - 1];
        this._lastEntryId = lastEntry ? lastEntry.id : 0;
        this._EntryId = 0;
    }

    insert(entry) {
        const newEntry = { ...entry, id: this._lastEntryId + 1 + this._EntryId};
        this._EntryId++;
        const newEntries = [...this.entries, newEntry];
        return writeFile(this._filePath, JSON.stringify(newEntries, null, 2))
            .then(() => { this.entries = newEntries; });
    }

    findById(id) {
        const entry = this.entries.find(entry => entry.id === id);
        return Promise.resolve(entry);
    }

    getAll() {
        return Promise.resolve(this.entries);
    }

    queryBy(fn) {
        return Promise.resolve(this.entries.filter(fn));
    }
}