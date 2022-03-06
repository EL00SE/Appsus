import { eventBus } from '../../../services/eventBus-service.js'
import longText from '../../../cmps/long-text.cmp.js'

export default {
    props: [
        'mail',
        'summeryOpen'
    ],
    template: `
        <section class="mail-summery">
        <div class="summery-container">
        <div class="grid summery-head">
            <p class="sum-subject">{{ mail.subject }}</p>
            <p class="sent-at">{{ formatDate }}</p>
        </div>
        <div class="flex align-center sum-inner-container">
        <p class="sum-from-name">{{ mail.fromName }}</p>
        <p class="sum-from-address">&lt{{ mail.fromEmail }}&gt</p>
        </div>
        <p class="sum-to">to: {{mail.to}}</p>
        <long-text v-if="summeryOpen" class="sum-body" :txt="mail.body"></long-text>
        <p class="mail-details-body" v-else>{{ mail.body }}</p>
        </div>
        </section>
    `,
    data() {
        return {
        }
    },
    components: {
        longText
    },
    created() {
    },
    methods: {


    },
    computed: {
        formatDate() {
            return moment(this.mail.sentAt).format('DD/MM/YYYY HH:MM')
        },
    }
}