import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['color'],
    template: `
        <section class="note-text-input">
        <textarea class="form-element" :style="{backgroundColor: color}" title="Add note content (required)" v-model="text" cols="30" rows="10" placeholder="Take a note..." @change="textEdit()"></textarea>
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