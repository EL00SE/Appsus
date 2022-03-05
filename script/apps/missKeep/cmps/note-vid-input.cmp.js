import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['url', 'color'],
    template: `
        <section :style="{backgroundColor: color}" class="note-vid-input">
            <input :style="{backgroundColor: color}" class="form-input" v-model="vidUrl" type="text" placeholder="Enter Youtube video url" @input="updateUrl()">
        </section>
    `,
    data() {
        return {
            vidUrl: this.url //may need to be changed
        }
    },
    created() {

    },
    components: {

    },
    methods: {
        updateUrl() {
            eventBus.emit('vidUrlEdit', this.vidUrl)
        }
    },
    computed: {

    },
    watch: {

    }
}