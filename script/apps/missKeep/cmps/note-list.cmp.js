import { eventBus } from '../../../services/eventBus-service.js';
import { noteService } from '../services/note-service.js';
import notePreview from './note-preview.cmp.js'

export default {
    template: `
        <section class="note-list">
                <div v-for="note in notes" :key="note.id" class="note-preview-container" 
                :style="{width: (note.type === 'noteVid')? '350px': '238px' ,backgroundColor:(note.color !== 'var(--color-def)')? note.color: 'white',borderColor:note.color}" >
                   <note-preview :note="note" ></note-preview>
                   <div class="actions">
                       <button @click="remove(note.id)">X</button>
                   </div>
                </div>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        this.unsubscribe = eventBus.on('noteCreate', this.updateList)
        this.updateList()
    },
    components: {
        notePreview
    },
    methods: {
        updateList() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
    },
    computed: {

    }
}