import noteActions from './note-actions.cmp.js'
import { noteService } from '../services/note-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
export default {
    template: `
        <form ref="noteForm" @submit.prevent="save" class="note-create">
            <input ref="noteTitleInput" type="text" v-model="noteToCreate.title" id="note-input-title" placeholder="Title" class="form-element"/>
            <textarea ref="noteTextArea" v-model="noteToCreate.info.txt" id="note-input-text" cols="30" rows="10" placeholder="Take a note..." class="form-element"></textarea>
            <note-actions></note-actions>
        </form>
    `,
    data() {
        return {
            noteToCreate: noteService.getEmptyNote(),
            color: "--color-def",
        }
    },
    created() {
        this.unsubscribe = eventBus.on('colorChange', this.colorChange)
        this.unsub = eventBus.on('save', this.save)

    },
    mounted() {
        this.$refs.note
    },
    components: {
        noteService,
        eventBus,
        noteActions
    },
    methods: {
        save() {
            if (!this.noteToCreate.info) return;
            noteService.save(this.noteToCreate)
                .then(note => {
                    eventBus.emit('show-msg', { txt: 'Note created', type: "success" })
                })
        },
        colorChange(color) {
            this.noteToCreate.color = color
            this.$refs.noteForm.style.backgroundColor = color
            this.$refs.noteTitleInput.style.backgroundColor = color
            this.$refs.noteTextArea.style.backgroundColor = color
        }
    },
    computed: {},
    watch: {

    },
    unmounted() {
        this.unsub()
        this.unsubscribe()
    }

}