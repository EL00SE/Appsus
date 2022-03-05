import mailSummery from './mail-summery.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
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
    <!-- <input  type="textarea" placeholder="Body:" resize="none"> -->
            
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

    },
    methods: {
        sendMail() {
            console.log(this.mailBody);
            console.log(this.mailSubject);
            console.log(this.mailTo);
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
            console.log(newMail);
            mailService.save(newMail).then(() => {
                this.$emit('composed')
            })
        },
        closeCompose() {
            this.isComposing = false
            this.$emit('closeCompose')
        }

    },
    computed: {

    }
}