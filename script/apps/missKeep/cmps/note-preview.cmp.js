import noteText from './note-text.cmp.js'
import noteTodo from './note-todo.cmp.js'
import noteImg from './note-img.cmp.js'
import noteVid from './note-vid.cmp.js'

export default {
    props: ['note'],
    template: `
        <section class="note-preview">
           <component :is="note.type" :note="note" class="note-content"></component>
        </section>
    `,
    data() {
        return {

        }
    },
    created() {},
    components: {
        noteText,
        noteTodo,
        noteImg,
        noteVid
    },
    methods: {},
    computed: {}
}