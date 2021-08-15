const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes()

    // Check if there is a note with the same title
    // "Foreach 'note' inside notes..."
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
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

const removeNote = (title) => {
    const notes = loadNotes()

    const remainingNotes = notes.filter((note) => note.title !== title);

    if (remainingNotes.length != notes.length) {
        saveNotes(remainingNotes)
        console.log(chalk.green.inverse('Note '+ '\'' + title + '\' removed'))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.yellow('Your Notes...\n'))

    let cont = 0;

    notes.forEach(note => {
        cont++
        console.log(chalk.yellow.inverse(cont.toString() + ' - ' + note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()

    const foundNote = notes.find((note) => note.title === title)

    if (foundNote) {
        console.log(chalk.yellow('Note Found...'))
        console.log(chalk.green.inverse(foundNote.title) + '\n')
        console.log(foundNote.body)
    } else {
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}