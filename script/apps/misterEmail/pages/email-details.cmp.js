import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'
import mailSummery from '../cmps/mail-summery.cmp.js'



export default {
    template: `
        <section v-if="mail" style="font-family:sansRegular">
         <!-- <mail-folder-list></mail-folder-list> -->
         <!-- <mail-summery :mail="this.mail"></mail-summery> -->
         <div class="mail-details-container">
         <div class="flex align-center summery-head mail-head">
            <p class="sum-subject">{{ mail.subject }}</p>
            <p class="sent-at">{{ formatDate }}</p>
        </div>
        <div class="flex align-center">
        <p class="sum-from-name">{{ mail.fromName }}</p>
        <p class="sum-from-address">&lt{{ mail.fromEmail }}&gt</p>
        </div>
        <p class="sum-to">to: {{mail.to}}</p>
        <!-- <long-text class="sum-body" :txt="mail.body"></long-text> -->
        <p>{{ mail.body }}</p>
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
        loadMail() {
            // console.log(this.mailId);
            mailService.get(this.mailId)
                .then(mail => this.mail = mail)
        },
    },
    computed: {
        formatDate() {
            return moment(this.mail.sentAt).format('DD/MM/YYYY HH:MM')
        },

    },
    unmounted() {

    },
    watch: {
        mailId: {
            handler() {
                this.loadMail()
                // console.log(this.mailId);
                // mailService.get(this.mailId)
                //     .then(mail => thid.mail = mail)
                // this.load = true
            },
            immediate: true
        }
    }
}