import { eventBus } from '../../../services/eventBus-service.js';
import { noteService } from '../services/note-service.js';
import notePreview from './note-preview.cmp.js'
import colorPalletePrev from './color-pallete-prev.cmp.js';
import { utilService } from '../../../services/util-service.js';

export default {
    template: `
        <section class="note-list">
                <div ref="noteCard" :style="{backgroundColor:note.color}" v-for="(note, index) in notes" :key="note.id" class="note-preview-container">
                   <note-preview :note="note"></note-preview>
                   <div class="actions">
                       <button title="Change note color" type="button" class="color-btn prev-btn" @click="openColorPallete($event)"></button>
                       <button title="Edit note" type="button" class="edit-btn prev-btn" @click="editNote(note.id)"></button>
                       <button title="Pin to top" type="button" class="prev-btn pin-btn" @click="pin(note.id)"></button>
                       <button title="Duplicate" type="button" class="prev-btn dupe-btn"  @click="duplicate(note.id)"></button>
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
        this.typeFilterUnsub = eventBus.on('typeFilter', this.filterBy)
        this.changeColorPrevUnsub = eventBus.on('changeColorPrev', this.changeNoteColor)
        this.closePalletPrevUnsub = eventBus.on('close', this.closeColorPallete)
        this.unsubscribe = eventBus.on('noteCreate', this.updateList)
        this.updateList()
    },
    components: {
        notePreview,
        colorPalletePrev,
        eventBus,
        noteService,
        utilService

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
                .then(notes => this.notes = this.sortNotes(notes))
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
            noteService.remove(id).then(() => this.updateList())

        },
        duplicate(id) {
            noteService.get(id).then(note => {
                    const newNote = note
                    newNote.id = ''
                    noteService.save(newNote)
                })
                .then(() => this.updateList())
        },
        pin(id) {
            noteService.get(id).then(note => {
                note.isPinned = !note.isPinned
                noteService.save(note)
            }).then(() => this.updateList())
        },
        sortNotes(notes) {
            const sortedNotes = []
            notes.forEach(note => {
                if (note.isPinned) sortedNotes.unshift(note)
                else sortedNotes.push(note)
            });
            return sortedNotes
        },
        filterBy(type) {
            const filteredNotes = this.sortNotes(this.notes)
            if (type !== '') filteredNotes.filter(note => note.type === type)
            this.notes = filteredNotes

        }
    },
    computed: {

    },
    unmounted() {
        this.changeColorPrevUnsub()
    }
}