import { eventBus } from '../../../services/eventBus-service.js'
import longText from '../../../cmps/long-text.cmp.js'

export default {
    props: ['mail'],
    template: `
   
        <section class="mail-summery">
        <div class="summery-container">
        <div class="flex align-center summery-head">
            <p class="sum-subject">{{ mail.subject }}</p>
            <p class="sent-at">{{ formatDate }}</p>
        </div>
        <!-- <button @click="openFull">full</button> -->
        <div class="flex align-center">
        <p class="sum-from-name">{{ mail.fromName }}</p>
        <p class="sum-from-address">&lt{{ mail.fromEmail }}&gt</p>
        </div>
        <p class="sum-to">to: {{mail.to}}</p>
        <long-text class="sum-body" :txt="mail.body"></long-text>
        <!-- <p>{{ mail.body }}</p> -->
        </div>
        </section>
    `,
    data() {
        return {
            summeryOpen: false
        }
    },
    components: {
        longText
    },
    created() {
        console.log('hi');
    },
    methods: {


    },
    computed: {
        formatDate() {
            return moment(this.mail.sentAt).format('DD/MM/YYYY HH:MM')
        },
    }
}