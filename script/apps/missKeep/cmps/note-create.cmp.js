import noteActions from './note-actions.cmp.js'
import noteListItem from './note-list-item.cmp.js'
import { noteService } from '../services/note-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
export default {
    template: `
        <form ref="noteForm" @submit.prevent="save" class="note-create">
            <input ref="noteTitleInput" type="text" v-model="noteToCreate.title" id="note-input-title" placeholder="Title" class="form-element"/>
            <textarea v-if="noteType === 'noteText'" ref="noteInfo" v-model="noteToCreate.info.txt" id="note-input-text" cols="30" rows="10" placeholder="Take a note..." class="form-element"></textarea>
            <ul  v-if="noteType === 'noteTodo'" >
                <note-list-item v-for="(item, index) in listItems" :key="index" :index="index" ref="noteInfo"></note-list-item>
                <button @click="addListItem()">Add</button>
            </ul>
            <note-actions></note-actions>
        </form>
    `,
    data() {
        return {
            noteToCreate: noteService.getEmptyNote(),
            noteType: 'noteText',
            listItems: [''],
        }
    },
    created() {
        this.colorUnsub = eventBus.on('colorChange', this.changeColor)
        this.saveUnsub = eventBus.on('save', this.save)
        this.typeUnsub = eventBus.on('typeChange', this.changeType)
        this.itemEditUnsub = eventBus.on('itemEdit', this.editItem)
    },
    mounted() {},
    components: {
        noteService,
        eventBus,
        noteActions,
        noteListItem
    },
    methods: {
        save() {
            if (!this.noteToCreate.info) return;
            noteService.save(this.noteToCreate)
                .then(note => {
                    eventBus.emit('show-msg', { txt: 'Note created', type: "success" })
                })
        },
        changeColor(color) {
            this.noteToCreate.color = color
            this.$refs.noteForm.style.backgroundColor = color
            this.$refs.noteTitleInput.style.backgroundColor = color
            this.$refs.noteInfo.style.backgroundColor = color
        },
        changeType(type) {
            this.noteToCreate.type = type
            this.noteType = type
        },
        editItem(data) {
            this.listItems[data.index] = data.text
        },
        addListItem() {
            this.listItems.push('')
        },
    },
    mounted() {
        this.$refs.noteTitleInput.focus()
    },
    computed: {},
    watch: {

    },
    unmounted() {
        this.colorUnsub()
        this.saveUnsub()
        this.typeUnsub()
        this.itemEditUnsub()
    }

}