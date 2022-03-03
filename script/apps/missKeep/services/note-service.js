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
        .then(note => {
            return _setNextPrevNoteId(note)
        })
}

function save(note) {
    if (note.id) return storageService.put(STORAGE_KEY, note)
    else return storageService.post(STORAGE_KEY, note)
}

function _setNextPrevNoteId(note) {
    return storageService.query(STORAGE_KEY).then(notes => {
        const noteIdx = notes.findIndex(currNote => currNote.id === note.id)
        note.nextNoteId = (note[noteIdx + 1]) ? note[noteIdx + 1].id : note[0].id
        note.prevNoteId = (note[noteIdx - 1]) ? note[noteIdx - 1].id : note[note.length - 1].id
        return note
    })
}

// Factory Method:
function getEmptyNote(type = 'noteText', color = 'var(--color-def)', info = '') {
    return {
        id: '',
        type,
        isPinned: '',
        info,
        color
    };
}

function _createNotes() {
    let notes = utilService.loadFromStorage(STORAGE_KEY);
    if (!notes || !notes.length) {
        notes = [];
        notes.push(_createNote('noteText', 'var(--color-red)', { title: 'Reminder', txt: 'Dont forget to finish sprint 3' }))
        notes.push(_createNote('noteText', 'var(--color-orange)', { title: 'Reminder', txt: 'Bring some vegies!!' }))
        notes.push(_createNote('noteTodo', 'var(--color-yellow)', { title: 'Workouts', items: ['Sunday: chest + back', 'Monday: shoulders + arms + legs + core', 'Wednesday: chest + back + core', 'Friday: shoulders + arms + legs'] }))
        notes.push(_createNote('noteText', 'var(--color-orange)', { title: 'Reminder', txt: 'Play Elden Ring' }))
        notes.push(_createNote('noteImg', 'var(--color-green)', { title: 'Funny meme', imgType: "jpg" }))
        notes.push(_createNote('noteText', 'var(--color-def)', { title: 'Reminder', txt: 'Improvise, Adapt, Overcome.., you should never give up' }))
        notes.push(_createNote('noteVid', 'var(--color-lightblue)', { title: 'Reminder', url: "https://www.youtube.com/embed/5qap5aO4i9A" }))
        utilService.saveToStorage(STORAGE_KEY, notes)
    }
    return notes
}

function _createNote(type, color, info) {
    const note = getEmptyNote(type, color, info)
    note.isPinned = false;
    note.id = utilService.makeId()
    if (note.type === "noteImg") {
        note.id = "m0BJsiHT" //tester only
        note.id += "." + note.info.imgType;
    }
    return note
}