import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'
import mailSummery from '../cmps/mail-summery.cmp.js'



export default {
    props: ['summeryOpen'],
    template: `
        <section class="mail-details">
            <mail-summery :summeryOpen="summeryOpen" :mail="mail"></mail-summery>
            <div class="flex mail-details-btn">
            <div @click.stop="exportNote" class="mail-trash mail-export mail-details"><i class="fa-solid fa-note-sticky"></i></div>
            <div @click.stop="closeDetails" class="mail-trash mail-back mail-details"><i class="fa-solid fa-arrow-right-to-bracket"></i></div>
            <div @click.stop="trashMail(mail, mail.isTrash)" class="mail-trash mail-details"><i class="fa-solid fa-trash "></i></div>
            </div>
        </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    created() {
        const id = this.$route.params.mailId
        mailService.get(id)
            .then(mail => this.mail = mail)
    },
    components: {
        mailFolderList,
        mailSummery
    },
    methods: {
        trashMail(mail, isTrash) {
            if (!isTrash) {
                mailService.trashMail(mail)
                    .then(() => mailService.query()
                        .then(() => {
                            eventBus.emit('show-msg', 'Moved to trash')
                            this.$router.push(`/email`)
                        }))
            } else {
                mailService.removeMail(mail.id)
                    .then(() => mailService.query()
                        .then(() => {
                            eventBus.emit('show-msg', 'Successfully deleted')
                            this.$router.push(`/email`)
                        }))
            }

        },
        closeDetails() {
            this.$router.push(`/email`)
        },
        exportNote() {

        }
    },
    computed: {
        formatDate() {
            return moment(this.mail.sentAt).format('DD/MM/YYYY HH:MM')
        },

    },
    unmounted() {

    },
    watch: {

    }
}