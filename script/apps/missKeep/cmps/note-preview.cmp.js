import noteText from './note-text.cmp.js'
import noteTodo from './note-todo.cmp.js'
import noteImg from './note-img.cmp.js'
import noteVid from './note-vid.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
import { noteService } from '../services/note-service.js'

export default {
    props: ['note'],
    template: `
        <section  class="note-preview">
            <div title="Pinned" v-if="note.isPinned" class="pin-icon"></div>
           <component :is="note.type" :note="note" class="note-content"></component>
        </section>
    `,
    data() {
        return {
            noteId: this.note.id,
        }
    },
    created() {
        this.changeColorUnsub = eventBus.on('changeColorPrev', this.changeColor)
    },
    components: {
        noteText,
        noteTodo,
        noteImg,
        noteVid,
        eventBus
    },
    mounted() {},
    methods: {
        changeColor(color) {
            this.classClr = color
            noteService.get(this.noteId)
                .then(note => {
                    note.color = color
                    noteService.save(note)
                })
        },

    },
    computed: {}
}