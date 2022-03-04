import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <section class="note-img-input">
            <input v-model="url" type="text" placeholder="Enter image url" @input="updateUrl()">
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
            eventBus.emit('imgUrlEdit', this.url)
        }
    },
    computed: {

    },
    watch: {

    }
}