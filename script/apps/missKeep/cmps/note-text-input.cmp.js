import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['color'],
    template: `
        <section :style="{backgroundColor: color}" class="note-text-input">
        <textarea :style="{backgroundColor: color}" title="Add note content (required)" v-model="text" cols="30" rows="10" placeholder="Take a note..." @change="textEdit()"></textarea>
        </section>
    `,
    data() {
        return {
            text: ''
        }
    },
    created() {

    },
    components: {

    },
    methods: {
        textEdit() {
            eventBus.emit('textEdit', this.text)
        }
    },
    computed: {

    },
    watch: {

    }
}