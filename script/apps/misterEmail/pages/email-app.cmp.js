import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'
import mailCompose from '../cmps/mail-compose.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'

export default {
    template: `
        <section class="email-app" style="font-family:sansRegular">
          
            <mail-filter @filtered="setFilter"></mail-filter>
          
           <div class="flex">
            <mail-folder-list @compose="isComposing=!isComposing" :unreadAmount="unreadAmount" @openFolder="setMailsForDisply" />
            <mail-list :mails="mailsForDisplay"/>
            <transition name="fade" enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__animated animate__fadeOutDown">
            <mail-compose @closeCompose="isComposing = false" @composed="updateMails" v-if="isComposing"></mail-compose>
        </transition>
        </div>
            
        </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: 'inbox',
            unreadAmount: null,
            isComposing: false,
            searchTerm: '',
        }
    },
    created() {


        mailService.query()
            .then(mails => {
                this.mails = mails
                mailService.getUnreadAmount(this.mails)
                    .then(res => {
                        this.unreadAmount = res
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
            this.starMail(mail.mail, mail.state)
        })
        this.unsubscribe5 = eventBus.on(('removed'), (mail) => {
            this.removeMail(mail)
        })
    },
    components: {
        mailList,
        mailFolderList,
        mailCompose,
        mailFilter,
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
                        return this.mails = res
                    }))
        },
        archiveMail(mail, isArchived) {
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
            mailService.removeMail(mail.id)
                .then(() => mailService.query()
                    .then(res => {
                        eventBus.emit('show-msg', 'Successfully deleted')
                        return this.mails = res
                    }))
        },
        setMailsForDisply(type) {
            this.filterBy = type

        },
        updateMails() {
            mailService.query()
                .then(mails => {
                    this.mails = mails
                    this.isComposing = false
                    eventBus.emit('show-msg', 'Mail sent')

                })
        },
        setFilter(searchTerm) {
            this.searchTerm = searchTerm.searchTerm
        },
        loadMail() {
            this.setMailsForDisply(this.folder)
        },

    },
    computed: {
        mailsForDisplay() {
            var filtered
            if (!this.filterBy) filtered = this.mails
            else if (this.filterBy === 'star') filtered = this.mails.filter(mail => mail.isStar && !mail.isTrash && !mail.isArchived)
            else if (this.filterBy === 'inbox') filtered = this.mails.filter(mail => !mail.isSent && !mail.isArchived && !mail.isTrash)
            else if (this.filterBy === 'sent') filtered = this.mails.filter(mail => mail.isSent && !mail.isTrash && !mail.isArchived)
            else if (this.filterBy === 'all') filtered = this.mails
            else if (this.filterBy === 'archive') filtered = this.mails.filter(mail => mail.isArchived && !mail.isTrash)
            else if (this.filterBy === 'trash') filtered = this.mails.filter(mail => mail.isTrash)
            else if (this.filterBy === 'read') filtered = this.mails.filter(mail => mail.isRead && !mail.isArchived && !mail.isTrash)
            else if (this.filterBy === 'unread') filtered = this.mails.filter(mail => !mail.isRead && !mail.isArchived && !mail.isTrash)

            const regex = new RegExp(this.searchTerm, 'i')
            return filtered.filter(mail => (
                regex.test(mail.subject) ||
                regex.test(mail.body) ||
                regex.test(mail.to) ||
                regex.test(mail.toName) ||
                regex.test(mail.fromName) ||
                regex.test(mail.fromEmail)
            ))
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

        },

    },
    unmounted() {
        this.unsubscribe1();
        this.unsubscribe2();
        this.unsubscribe3();
    },
    watch: {

    }
}