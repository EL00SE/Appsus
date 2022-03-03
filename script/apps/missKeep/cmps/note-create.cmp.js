import noteActions from './note-actions.cmp.js'
import { noteService } from '../services/note-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
export default {
    template: `
        <form ref="noteForm" @submit.prevent="save" class="note-create">
            <input type="text" v-model="noteToCreate.title" id="note-input-title" placeholder="Title" class="form-element"/>
            <textarea v-model="noteToCreate.info.txt" id="note-input-text" cols="30" rows="10" placeholder="Take a note..." class="form-element"></textarea>
            <note-actions></note-actions>
            <button class="form-element save-btn">Create note</button>
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
        }
    },
    computed: {},
    watch: {

    },
    unmounted() {}

}