import { storageService } from '../../../services/async-storage-service'
import { utilService } from '../../../services/util-service.js'

const STORAGE_KEY = 'mailsDB'
_createMails()

export const noteService = {
    query,
    remove,
    save,
    get,
    getEmptyMail,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function remove(mailId) {
    return storageService.remove(STORAGE_KEY, mailId)
}

function get(mailId) {
    return storageService.get(STORAGE_KEY, mailId)
        .then(mail => {
            return _setNextPrevMailId(mail)
        })
}

function save(mail) {
    if (mail.id) return storageService.put(STORAGE_KEY, mail)
    else return storageService.post(STORAGE_KEY, mail)
}

function _setNextPrevMailId(mail) {
    return storageService.query(STORAGE_KEY).then(mails => {
        const noteIdx = mails.findIndex(currNote => currNote.id === mail.id)
        mail.nextNoteId = (mail[noteIdx + 1]) ? mail[noteIdx + 1].id : mail[0].id
        mail.prevNoteId = (mail[noteIdx - 1]) ? mail[noteIdx - 1].id : mail[mail.length - 1].id
        return mail
    })
}

// Factory Method:
function getEmptyMail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        to: '',
        from: '',
        isRead: false,
        sentAt: utilService,
        isSent: false,
        isStar: false,
        isTrash: false,
        isRemoved: false,
        label: ''
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(STORAGE_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (var i = 0; i < 10; i++) {
            mails
        }
        mails.push(_createMail('note-txt', { txt: 'Dont forget to finish sprint 3' }))
        mails.push(_createMail('note-txt', { txt: 'Bring some vegies!!' }))
        mails.push(_createMail('note-list', { title: 'Workouts', items: ['Sunday: chest + back', 'Monday: shoulders + arms + legs + core', 'Wednesday: chest + back + core', 'Friday: shoulders + arms + legs'] }))
        mails.push(_createMail('note-txt', { txt: 'Play Elden Ring' }))
        utilService.saveToStorage(STORAGE_KEY, mails)
    }
    return mails
}

function _createMail(type, info) {
    const mail = getEmptyMail(type, info)
    mail.isPinned = false;
    mail.id = utilService.makeId()
    return mail
}

function _createMailTimeStamp() {
    return utilService.getRndIntInc(1425300160995, 1646224940880)
}