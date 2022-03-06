
import { mailService } from '../services/mail-service.js'

export default {
    template: `
        <section v-if="isComposing" class="mail-compose">
            <div class="compose-inner-container">
        <div class="compose-header flex column align-center">
        <button @click="closeCompose" class="btn-close-compose">X</button>
        </div>
        <div class="mail-compose-container">
            <form v-on:submit.prevent="sendMail">
    <input required v-model="mailTo" class="compose-to" type="email" placeholder="To:">
    <input required v-model="mailSubject" class="compose-subject" type="text" placeholder="Subject:">
    <textarea required v-model="mailBody" class="compose-body"  style="resize:none" placeholder="Body:">
       </textarea>
       <button class="btn-send-mail">send</button>
       </form>
        </div>
        </div>
        </section>
    `,
    data() {
        return {
            mailTo: null,
            mailSubject: null,
            mailBody: null,
            isComposing: true
        }
    },
    components: {

    },
    created() {
        const subject = this.$route.query.title
        const body = this.$route.query.txt
        if (subject && body) {
            this.mailSubject = subject
            this.mailBody = body
        }

    },
    mounted() {
        const subject = this.$route.query.title
        const body = this.$route.params.txt
        if (subject && body) {
            this.mailSubject = subject
            this.mailBody = body
        }
    },
    methods: {
        sendMail() {

            const newMail = mailService.getEmptyMail()
            newMail.fromName = mailService.getLoggedInUser().name
            newMail.isSent = true
            newMail.isRead = true
            newMail.sentAt = Date.now()
            newMail.to = this.mailTo
            newMail.toName = this.mailTo
            newMail.subject = this.mailSubject
            newMail.body = this.mailBody
            newMail.id = null
            mailService.save(newMail).then(() => {
                this.$emit('composed')
            })
        },
        closeCompose() {
            this.isComposing = false
            this.$emit('closeCompose')
        },
        import(txt) {
            this.body = txt
            return Promise.resolve()

        }

    },
    computed: {

    },
    watch: {
        '$route.query.txt': {
            handler(txt) {
                this.body = txt

            },
            immeddiate: true,
        },
        '$route.params': {
            handler(title) {
                this.subject = title
            },
            immediate: true
        }
    }
}