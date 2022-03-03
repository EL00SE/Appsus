import mailPreview from './mail-preview.cmp.js'
import mailSummery from './mail-summery.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
        <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id" class="mail-preview-container" >
                   <mail-preview :mail="mail"/>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            summeryOpen: false,
            mailSummery: null
        }
    },
    components: {
        mailPreview,
        mailSummery
    },
    methods: {
        openSummery(mail) {
            console.log(mail);
            this.summeryOpen = true
            this.mailSummery = mail
        }

    },
    computed: {}
}