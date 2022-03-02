import noteText from './note-text.cmp.js'
import noteTodo from './note-todo.cmp.js'

export default {
    props: ['note'],
    template: `
        <section class="note-preview">
           <component :is="note.type" :note="note" class="note-content"></component>
        </section>
    `,
    data() {
        return {
            cmpType: this.note.type
        }
    },
    created() {},
    components: {
        noteText,
        noteTodo
    },
    methods: {},
    computed: {}
}