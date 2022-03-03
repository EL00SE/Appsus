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
        this.unsubscribe = eventBus.on('removed',
            (mail) => { this.removeMail(mail) }
        )
    },
    components: {
        mailList,
    },
    methods: {
        removeMail(mail) {
            mailService.trashMail(mail)
                .then(() => mailService.query()
                    .then(res => {
                        eventBus.emit('show-msg', 'Moved to trash')
                        console.log(res)
                        return this.mails = res
                    }))
        },
    },
    computed: {
        mailsForDisplay() {
            return this.mails
        }

    },
    unmounted() {
        this.unsubscribe();
    },
    watch: {

    }
}