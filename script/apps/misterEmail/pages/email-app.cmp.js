import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <section class="email-app">
            <h1>hello</h1>
            <mail-list :mails="mails"></mail-list>
        </section>
    `,
    data() {
        return {
            mails: null,
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
        this.unsubscribe1 = eventBus.on('trashed',
            (mail) => { this.trashMail(mail) }
        )
        this.unsubscribe2 = eventBus.on(('read'), (mail) => {
            this.markRead(mail.mail, mail.state)
        })
        this.unsubscribe3 = eventBus.on(('archived'), (mail) => {
            this.archiveMail(mail.mail, mail.state)
        })
        this.unsubscribe4 = eventBus.on(('starred'), (mail) => {
            console.log(mail.state);
            this.starMail(mail.mail, mail.state)
        })
        this.unsubscribe5 = eventBus.on(('removed'), (mail) => {
            // console.log(mail.state);
            this.removeMail(mail)
        })
    },
    components: {
        mailList,
    },
    methods: {
        trashMail(mail) {
            mailService.trashMail(mail)
                .then(() => mailService.query()
                    .then(res => {
                        eventBus.emit('show-msg', 'Moved to trash')
                        return this.mails = res
                    }))
        },
        markRead(mail, isRead) {
            mailService.markRead(mail, isRead)
                .then(() => mailService.query()
                    .then(res => {
                        if (isRead) eventBus.emit('show-msg', 'Marked as read')
                        else eventBus.emit('show-msg', 'Marked as unread')
                        return this.mails = res
                    }))
        },
        archiveMail(mail, isArchived) {
            console.log('hi');
            mailService.archiveMail(mail, isArchived)
                .then(() => mailService.query()
                    .then(res => {
                        if (isArchived) eventBus.emit('show-msg', 'Moved to archive')
                        else eventBus.emit('show-msg', 'Moved to inbox')
                        return this.mails = res
                    }))
        },
        starMail(mail, isStar) {
            mailService.markStar(mail, isStar)
                .then(() => mailService.query()
                    .then(res => {
                        if (isStar) eventBus.emit('show-msg', 'Star on')
                        else eventBus.emit('show-msg', 'Star off')
                        return this.mails = res
                    }))
        },
        removeMail(mail) {
            console.log(mail);
            mailService.removeMail(mail.id)
                .then(() => mailService.query()
                    .then(res => {
                        eventBus.emit('show-msg', 'Successfully deleted')
                        return this.mails = res
                    }))
        }
    },
    computed: {
        mailsForDisplay() {
            return this.mails
        }

    },
    unmounted() {
        this.unsubscribe1();
        this.unsubscribe2();
        this.unsubscribe3();
    },
    watch: {

    }
}