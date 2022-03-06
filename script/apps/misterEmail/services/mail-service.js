import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'

const STORAGE_KEY = 'mailsDB'
_createMails()



export const mailService = {
    query,
    removeMail,
    save,
    get,
    getEmptyMail,
    trashMail,
    markRead,
    archiveMail,
    markStar,
    getLoggedInUser,
    getUnreadAmount,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function removeMail(mailId) {
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
        const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
        mail.nextNoteId = (mails[mailIdx + 1]) ? mails[mailIdx + 1].id : mails[0].id
        mail.prevNoteId = (mails[mailIdx - 1]) ? mails[mailIdx - 1].id : mails[mails.length - 1].id
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
        toName: '',
        fromName: '',
        fromEmail: getLoggedInUser().email,
        isRead: false,
        sentAt: null,
        isSent: false,
        isStar: false,
        isTrash: false,
        isArchived: false,
        label: ''
    }
}

function getLoggedInUser() {
    const loggedinUser = {
        email: 'amitmiz@gmail.com',
        name: 'Amit Miz'
    }
    return loggedinUser
}

function _createMails() {
    let mails = utilService.loadFromStorage(STORAGE_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (var i = 0; i < 20; i++) {
            mails.push(_createMail())
        }
        _prepareData(mails)

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
    mail.to = 'Me'
    return mail
}

function _createMailTimeStamp() {
    return utilService.getRndIntInc(1425300160995, 1646224940880)
}

function _createMailSubject() {
    return utilService.makeLorem(utilService.getRndIntInc(2, 4))
}

function _createMailBody() {
    return utilService.makeLorem(utilService.getRndIntInc(100, 300))
}

function _createMailId() {
    return utilService.makeId()
}

function _createSenderEmail(userIdx) {
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
        mail.isRead = isRead
        save(mail)
        resolve(mail)
    })
}

function archiveMail(mail, isArchived) {
    return new Promise((resolve) => {
        mail.isArchived = isArchived
        mail.isTrash = false
        save(mail)
        resolve(mail)
    })
}

function markStar(mail, isStar) {
    return new Promise((resolve) => {
        mail.isStar = isStar
        save(mail)
        resolve(mail)
    })
}

function _prepareData(mails) {
    mails[1].isStar = true
    mails[2].isRead = true
    mails[2].isStar = true
    mails[3].isRead = true
    mails[5].isRead = true
    mails[7].isRead = true
    mails[7].isStar = true
    mails[14].isTrash = true
    mails[15].isTrash = true
    mails[8].isArchived = true
    mails[9].isArchived = true

    mails[10].fromEmail = getLoggedInUser().email
    mails[10].fromName = getLoggedInUser().name
    mails[10].to = 'puki205@gmail.com'
    mails[10].toName = 'puki atrr'
    mails[10].isSent = true
    mails[10].isRead = true

    mails[11].fromEmail = getLoggedInUser().email
    mails[11].fromName = getLoggedInUser().name
    mails[11].to = 'popo385@gmail.com'
    mails[11].toName = 'popo div'
    mails[11].isSent = true
    mails[11].isRead = true

    mails[12].fromEmail = getLoggedInUser().email
    mails[12].fromName = getLoggedInUser().name
    mails[12].to = 'muki391@gmail.com'
    mails[12].toName = 'muki bind'
    mails[12].isSent = true
    mails[12].isRead = true

    mails[13].fromEmail = getLoggedInUser().email
    mails[13].fromName = getLoggedInUser().name
    mails[13].to = 'luki012@gmail.com'
    mails[13].toName = 'luki dom'
    mails[13].isSent = true
    mails[13].isRead = true
}

function getUnreadAmount(mails) {
    var count = 0

    mails.forEach(mail => {
        if (!mail.isRead && !mail.isArchived && !mail.isTrash && !mail.isSent) count++
    })
    return Promise.resolve(count)
}