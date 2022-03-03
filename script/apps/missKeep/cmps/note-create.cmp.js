import noteActions from './note-actions.cmp.js'
import { noteService } from '../services/note-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
export default {
    template: `
        <form @submit.prevent="save" class="note-create">
            <input type="text" v-model="noteToCreate.title" id="note-input-title" placeholder="Title" class="form-element"/>
            <textarea required v-model="noteToCreate.info.txt" id="note-input-text" cols="30" rows="10" placeholder="Take a note..." class="form-element"></textarea>
            <note-actions></note-actions>
            <button class="form-element save-btn">Create note</button>
        </form>
    `,
    data() {
        return {
            noteToCreate: noteService.getEmptyNote()
        }
    },
    created() {

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
                    eventBus.emit('saved', { key: 'val' })
                })
        }
    },
    computed: {

    },
    watch: {

    }
}