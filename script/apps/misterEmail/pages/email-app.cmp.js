import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'

export default {
    template: `
        <section class="email-app flex" style="font-family:sansRegular">
            <!-- <h1>hello</h1> -->
            <mail-folder-list :unreadAmount="unreadAmount" @openFolder="setMailsForDisply" />
            <mail-list :mails="mailsForDisplay"/>
            <!-- <router-view></router-view> -->
        </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: 'inbox',
            unreadAmount: null,
        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
                console.log(this.mails)
                mailService.getUnreadAmount(this.mails)
                    .then(res => {
                        this.unreadAmount = res
                        console.log(this.unreadAmount);
                    })
            })

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
            this.removeMail(mail)
        })
    },
    components: {
        mailList,
        mailFolderList
    },
    methods: {
        trashMail(mail) {
            mailService.trashMail(mail)
                .then(() => mailService.query()
                    .then(res => {
                        eventBus.emit('show-msg', 'Moved to trash')
                        debugger
                        if (!mail.isArchived && !mail.isSent && !mail.isRead)
                            this.unreadAmount--
                        return this.mails = res
                    }))
        },
        markRead(mail, isRead) {
            mailService.markRead(mail, isRead)
                .then(() => mailService.query()
                    .then(res => {
                        if (isRead && !mail.isArchived && !mail.isTrash && !mail.isSent) this.unreadAmount--
                        else if (!isRead && !mail.isArchived && !mail.isTrash && !mail.isSent) this.unreadAmount++
                        // if (isRead) eventBus.emit('show-msg', 'Marked as read')
                        // else eventBus.emit('show-msg', 'Marked as unread')

                        return this.mails = res
                    }))
        },
        archiveMail(mail, isArchived) {
            console.log('hi');
            mailService.archiveMail(mail, isArchived)
                .then(() => mailService.query()
                    .then(res => {
                        if (isArchived && !mail.isRead && !mail.isTrash && !mail.isSent) {
                            this.unreadAmount--
                        }
                        if (!isArchived && !mail.isRead && !mail.isTrash && !mail.isSent) {
                            this.unreadAmount++
                        }
                        if (isArchived)
                            eventBus.emit('show-msg', 'Moved to archive')
                        else {
                            eventBus.emit('show-msg', 'Moved to inbox')
                            // this.unreadAmount++
                        }

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
        },
        setMailsForDisply(type) {
            console.log(type);
            this.filterBy = type
        }
    },
    computed: {
        mailsForDisplay() {
            if (!this.filterBy) return this.mails
            else if (this.filterBy === 'star') return this.mails.filter(mail => mail.isStar && !mail.isTrash && !mail.isArchived)
            else if (this.filterBy === 'inbox') return this.mails.filter(mail => !mail.isSent && !mail.isArchived && !mail.isTrash)
            else if (this.filterBy === 'sent') return this.mails.filter(mail => mail.isSent && !mail.isTrash && !mail.isArchived)
            else if (this.filterBy === 'all') return this.mails
            else if (this.filterBy === 'archive') return this.mails.filter(mail => mail.isArchived && !mail.isTrash)
            else if (this.filterBy === 'trash') return this.mails.filter(mail => mail.isTrash)
            else if (this.filterBy === 'read') return this.mails.filter(mail => mail.isRead && !mail.isArchived && !mail.isTrash)
            else if (this.filterBy === 'unread') return this.mails.filter(mail => !mail.isRead && !mail.isArchived && !mail.isTrash)
        },
        unreadAmount() {
            mailService.query()
                .then(mails => {
                    mailService.getUnreadAmount(mails)
                        .then(res => {
                            this.unreadAmount = res
                            return this.unreadAmount
                        })
                })

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