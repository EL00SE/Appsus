import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const STORAGE_KEY = 'notesDB'
_createNotes()

export const noteService = {
    query,
    remove,
    save,
    get,
    getEmptyNote,
};

function query() {
    return storageService.query(STORAGE_KEY)
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId)
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(STORAGE_KEY, note)
    else return storageService.post(STORAGE_KEY, note)
}

// function _setNextPrevNoteId(note) {
//     return storageService.query(STORAGE_KEY).then(notes => {
//         const noteIdx = notes.findIndex(currNote => currNote.id === note.id)
//         note.nextNoteId = (note[noteIdx + 1]) ? note[noteIdx + 1].id : note[0].id
//         note.prevNoteId = (note[noteIdx - 1]) ? note[noteIdx - 1].id : note[note.length - 1].id
//         return note
//     })
// }

// Factory Method:
function getEmptyNote(type = 'noteText', color = 'var(--color-def)', title = '', info = {}) {
    return {
        id: '',
        type,
        title,
        isPinned: '',
        info,
        color
    };
}

function _createNotes() {
    let notes = utilService.loadFromStorage(STORAGE_KEY);
    if (!notes || !notes.length) {
        notes = [];
        notes.push(_createNote('noteText', 'var(--color-red)', 'Reminder', { txt: 'Dont forget to finish sprint 3' }))
        notes.push(_createNote('noteText', 'var(--color-orange)', 'Reminder', { txt: 'Bring some vegies!!' }))
        notes.push(_createNote('noteTodo', 'var(--color-yellow)', 'Workouts', { items: [{ txt: 'Sunday: chest + back', isDone: false }, { txt: 'Monday: shoulders + arms + legs + core', isDone: false }, { txt: 'Wednesday: chest + back + core', isDone: false }, { txt: 'Friday: shoulders + arms + legs', isDone: false }] }))
        notes.push(_createNote('noteText', 'var(--color-orange)', 'Reminder', { txt: 'Play Elden Ring' }))
        notes.push(_createNote('noteImg', 'var(--color-green)', 'Funny meme', { url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg' }))
        notes.push(_createNote('noteText', 'var(--color-def)', 'Reminder', { txt: 'Improvise, Adapt, Overcome.., you should never give up' }))
        notes.push(_createNote('noteVid', 'var(--color-lightblue)', 'Reminder', { url: 'https://www.youtube.com/embed/5qap5aO4i9A' }))
        utilService.saveToStorage(STORAGE_KEY, notes)
    }
    return notes
}

function _createNote(type, color, title, info) {
    const note = getEmptyNote(type, color, title, info)
    note.isPinned = false;
    note.id = utilService.makeId()
    return note
}