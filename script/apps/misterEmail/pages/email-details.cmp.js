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
        </section>
    `,
    data() {
        return {
            mail: null,
            // summeryOpen: false
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