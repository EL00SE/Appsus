import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'

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
    },
    components: {
        mailList,
    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
}