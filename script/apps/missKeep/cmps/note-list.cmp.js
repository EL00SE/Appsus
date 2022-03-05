import { eventBus } from '../../../services/eventBus-service.js';
import { noteService } from '../services/note-service.js';
import notePreview from './note-preview.cmp.js'
import colorPalletePrev from './color-pallete-prev.cmp.js';

export default {
    template: `
        <section class="note-list">
                <div ref="noteCard" :style="{backgroundColor:note.color}" title="Click to edit note" v-for="(note, index) in notes" :key="note.id" class="note-preview-container">
                   <note-preview :note="note" @click="editNote(note.id)" ></note-preview>
                   <div class="actions">
                       <button title="Change note color" type="button" class="color-btn prev-btn" @click="openColorPallete($event)"></button>
                       <button title="Pin to top" type="button" class="prev-btn pin-btn"></button>
                       <button title="Duplicate" type="button" class="prev-btn dupe-btn"></button>
                       <button title="Send as mail" type="button" class="prev-btn send-as-mail-btn"></button>
                       <button title="Delete" type="button" class="prev-btn remove-btn" @click="remove(note.id)"></button>
                    <color-pallete-prev :note="note" type="button" v-if="openPallete" :style="{top: distanceY+'px',left:distanceX+'px'}"></color-pallete-prev>
                    </div>
                </div>
        </section>
    `,
    data() {
        return {
            notes: null,
            note: null,
            openPallete: false,
        }
    },
    created() {
        this.changeColorPrevUnsub = eventBus.on('changeColorPrev', this.changeNoteColor)
        this.closePalletPrevUnsub = eventBus.on('close', this.closeColorPallete)
        this.unsubscribe = eventBus.on('noteCreate', this.updateList)
        this.updateList()
    },
    components: {
        notePreview,
        colorPalletePrev,
        eventBus,
        noteService

    },
    methods: {
        changeNoteColor() {
            Promise.resolve().then(() => {
                this.updateList()
                this.openPallete = false
            })
        },
        updateList() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        editNote(id) {
            eventBus.emit('noteEdit', id)
        },
        openColorPallete(ev) {
            this.openPallete = !this.openPallete
            this.distanceX = ev.clientX
            this.distanceY = ev.clientY + 5
        },
        closeColorPallete() {
            this.openPallete = false
        },
        remove(id) {
            noteService.remove(id)
            Promise.resolve().then(() => this.updateList())
        },
    },
    computed: {

    },
    unmounted() {
        this.changeColorPrevUnsub()
    }
}