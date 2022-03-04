import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <section class="note-vid-input">
            <input v-model="url" type="text" placeholder="Enter Youtube video url" @input="updateUrl()">
        </section>
    `,
    data() {
        return {
            url: ''
        }
    },
    created() {

    },
    components: {

    },
    methods: {
        updateUrl() {
            eventBus.emit('vidUrlEdit', this.url)
        }
    },
    computed: {

    },
    watch: {

    }
}