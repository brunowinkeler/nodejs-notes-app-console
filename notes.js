const chalk = require('chalk')
const fs = require('fs')

const getNotes = function() {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()

    // Check if there is a note with the same title
    // "Foreach 'note' inside notes..."
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNote = function (title) {
    const notes = loadNotes()

    const filteredNotes = notes.filter(e => e.title === title);
    filteredNotes.forEach(f => notes.splice(notes.findIndex(e => e.title === f.title),1));

    if (filteredNotes.length > 0) {
        saveNotes(notes)
        console.log(chalk.green.inverse('Note '+ '\'' + title + '\' removed'))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}