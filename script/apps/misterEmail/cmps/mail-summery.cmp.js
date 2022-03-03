import { eventBus } from '../../../services/eventBus-service.js'
import longText from '../../../cmps/long-text.cmp.js'

export default {
    props: ['mail'],
    template: `
        <section class="mail-summery">
        <div class="summery-container">
        <p class="sum-subject">{{ mail.subject }}</p>
        <div class="flex align-center">
        <p class="sum-from-name">{{ mail.fromName }}</p>
        <p class="sum-from-address"><{{ mail.fromEmail }}></p>
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

    }
}