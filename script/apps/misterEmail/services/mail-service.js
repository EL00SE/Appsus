import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'

const STORAGE_KEY = 'mailsDB'
_createMails()



export const mailService = {
    query,
    remove,
    save,
    get,
    getEmptyMail,
    trashMail,
    markRead,
    archiveMail,
}

function query() {
    // return
    return storageService.query(STORAGE_KEY).then(mails => {
        console.log(mails)
        return mails.filter(mail => {
            return mail.isTrash === false
        })
    })
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
        id: _createMailId(),
        subject: '',
        body: '',
        to: '',
        fromName: '',
        fromEmail: '',
        isRead: false,
        sentAt: null,
        isSent: false,
        isStar: false,
        isTrash: false,
        isRemoved: false,
        isArchived: false,
        label: ''
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(STORAGE_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (var i = 0; i < 10; i++) {
            mails.push(_createMail())
        }
        mails[2].isRead = true
        mails[3].isRead = true
        mails[5].isRead = true
        mails[7].isRead = true
        utilService.saveToStorage(STORAGE_KEY, mails)
    }
    return mails
}

function _createMail() {
    const mail = getEmptyMail()
    mail.subject = _createMailSubject()
    mail.body = `The ${mail.subject} ` + _createMailBody()
    mail.sentAt = _createMailTimeStamp()
    var senderIdx = _getSenderIdx()
    mail.fromName = _createSenderEmail(senderIdx).name
    mail.fromEmail = _createSenderEmail(senderIdx).email[mail.fromName] + '@gmail.com'
    // console.log(_createSenderEmail(senderIdx).email[mail.fromName]);

    return mail
}

function _createMailTimeStamp() {
    return utilService.getRndIntInc(1425300160995, 1646224940880)
}

function _createMailSubject() {
    return utilService.makeLorem(utilService.getRndIntInc(2, 4))
}

function _createMailBody() {
    return utilService.makeLorem(utilService.getRndIntInc(50, 150))
}

function _createMailId() {
    return utilService.makeId()
}

function _createSenderEmail(userIdx) {
    // var idx = utilService.getRndIntInc(1, 5)
    const usersEmail = [
        { 'popo div': 'popo385' },
        { 'momo lib': 'momo592' },
        { 'puki atrr': 'puki205' },
        { 'muki bind': 'muki391' },
        { 'luki dom': 'luki012' },
    ]
    return {
        name: Object.keys(usersEmail[userIdx])[0],
        email: usersEmail[userIdx]
    }
}

function _getSenderIdx() {
    return utilService.getRndIntInc(0, 4)
}

function trashMail(mail) {
    return new Promise((resolve) => {
        mail.isTrash = true
        mail.removedAt = Date.now()
        save(mail)
        resolve(mail)
    })
}

function markRead(mail, isRead) {
    return new Promise((resolve) => {
        console.log(isRead);
        mail.isRead = isRead
        save(mail)
        resolve(mail)
    })
}

function archiveMail(mail, isArchived) {
    return new Promise((resolve) => {
        // console.log(isRead);
        mail.isArchived = isArchived
        save(mail)
        resolve(mail)
    })
}