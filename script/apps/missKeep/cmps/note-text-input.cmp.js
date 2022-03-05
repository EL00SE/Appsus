import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['text', 'color'],
    template: `
        <section :style="{backgroundColor: color}" class="note-text-input">
        <textarea :style="{backgroundColor: color}" title="Add note content (required)" v-model="inputText" cols="30" rows="10" placeholder="Take a note..." @change="textEdit()"></textarea>
        </section>
    `,
    data() {
        return {
            inputText: this.text
        }
    },
    created() {

    },
    components: {

    },
    methods: {
        textEdit() {
            eventBus.emit('textEdit', this.inputText)
        }
    },
    computed: {

    },
    watch: {

    }
}