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
        this.noteVidEdit = eventBus.on('editNoteVid', this.editUrl)
    },
    components: {

    },
    methods: {
        editUrl(url) {
            this.vidUrl = url
        },
        updateUrl() {
            eventBus.emit('vidUrlEdit', this.vidUrl)
        }
    },
    computed: {

    },
    watch: {

    }
}