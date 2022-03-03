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
        this.unsubscribe1 = eventBus.on('removed',
            (mail) => { this.trashMail(mail) }
        )
        this.unsubscribe2 = eventBus.on(('read'), (mail) => {
            // console.log(mail.state);
            this.markRead(mail.mail, mail.state)
        })
        this.unsubscribe3 = eventBus.on(('archives'), (mail) => {
            // console.log(mail.state);
            this.archiveMail(mail.mail, mail.state)
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
                        console.log(res)
                        return this.mails = res
                    }))
        },
        markRead(mail, isRead) {
            console.log(isRead);
            mailService.markRead(mail, isRead)
                .then(() => mailService.query()
                    .then(res => {
                        if (isRead) eventBus.emit('show-msg', 'Marked as read')
                        else eventBus.emit('show-msg', 'Marked as unread')
                        return this.mails = res
                    }
                    ))
        },
        archiveMail(mail, isArchived) {
            mailService.archiveMail(mail, isArchived)
                .then(() => mailService.query()
                    .then(res => {
                        if (isArchived) eventBus.emit('show-msg', 'Moved to archive')
                        else eventBus.emit('show-msg', 'Moved to inbox')
                        return this.mails = res
                    }
                    ))
        }
    },
    computed: {
        mailsForDisplay() {
            return this.mails
        }

    },
    unmounted() {
        this.unsubscribe1();
    },
    watch: {

    }
}