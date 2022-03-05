import noteActions from './note-actions.cmp.js'
import noteListItem from './note-list-item.cmp.js'
import noteImgInput from './note-img-input.cmp.js'
import noteVidInput from './note-vid-input.cmp.js'
import noteTextInput from './note-text-input.cmp.js'
import { noteService } from '../services/note-service.js'
import { ytService } from '../services/note-youtube-service.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <form ref="noteForm" class="note-create">
            <input title="Add note title" ref="noteTitleInput" type="text" v-model="title" placeholder="Title" class="form-element"/>
            <note-text-input :text="text" :color="color" v-if="noteType === 'noteText'" ref="noteText" class="form-element"></note-text-input> 
            <div class="todo-list" ref="noteTodo" v-if="noteType === 'noteTodo'" >
                <note-list-item ref="noteTodoItem" v-for="(item, index) in listItems" :key="index" :index="index" :text="item" :color="color"></note-list-item>
            </div>
            <button title="Add list item" v-if="noteType === 'noteTodo'" type="button" class="add-btn" @click="addListItem()"></button>
            <note-img-input :color="color" :url="url" title="Add note content (required)" ref="noteImg" v-if="noteType === 'noteImg'" ></note-img-input>
            <note-vid-input :color="color" :url="url" title="Add note content (required)" ref="noteVid" v-if="noteType === 'noteVid'" ></note-vid-input>
            <note-actions></note-actions>
        </form>
    `,
    data() {
        return {
            noteToCreate: noteService.getEmptyNote(),
            noteType: '',
            title: '',
            text: '',
            listItems: [],
            url: '',
            color: 'var(--color-def)',
            id: ''
        }
    },
    created() {
        this.noteEditUnsub = eventBus.on('noteEdit', this.editNote)
        this.colorUnsub = eventBus.on('colorChange', this.changeColor)
        this.saveUnsub = eventBus.on('save', this.save)
        this.typeUnsub = eventBus.on('typeChange', this.changeType)
        this.textEditUnsub = eventBus.on('textEdit', this.editText)
        this.itemEditUnsub = eventBus.on('itemEdit', this.editItem)
        this.itemDeleteUnsub = eventBus.on('itemDelete', this.deleteItem)
        this.imgEditUnsub = eventBus.on('imgUrlEdit', this.editImgUrl)
        this.vidEditUnsub = eventBus.on('vidUrlEdit', this.editVidUrl)
    },
    mounted() {},
    components: {
        noteService,
        ytService,
        eventBus,
        noteActions,
        noteListItem,
        noteTextInput,
        noteImgInput,
        noteVidInput
    },
    methods: {
        changeColor(color) {
            this.color = color
            this.noteToCreate.color = color
            this.$refs.noteForm.style.backgroundColor = color
            this.$refs.noteTitleInput.style.backgroundColor = color
        },
        changeType(type) {
            if (this.noteType === type) return
            this.noteType = type
            this.ResetData()
        },
        ResetData() {
            this.noteToCreate = noteService.getEmptyNote()
            this.text = ''
                // this.title = ''
            this.listItems = []
            this.url = ''
            this.id = ''
        },
        editText(text) {
            this.text = text
        },
        editItem(data) {
            this.listItems[data.index] = data.text

        },
        deleteItem(data) {
            this.listItems[data.index] = ''
        },
        addListItem() {
            this.listItems.push('')
        },
        editImgUrl(url) {
            this.url = url
        },
        editVidUrl(url) {
            this.url = url
        },
        editNote(id) {
            this.ResetData()
            this.id = id
            this.noteToCreate = noteService.get(id)
                .then(note => {
                    this.noteToCreate.id = id
                    this.noteType = note.type
                    this.color = note.color
                    this.title = note.title
                    this.changeColor(this.color)
                    if (note.info.url) this.url = note.info.url
                    if (note.info.txt) this.text = note.info.txt
                    if (note.info.items) this.listItems = note.info.items
                })
        },
        save() {
            if (this.noteType === '') return
            if (this.noteToCreate.id === '') this.noteToCreate = noteService.getEmptyNote()
            this.noteToCreate.type = this.noteType
            this.noteToCreate.color = this.color
            this.noteToCreate.title = this.title
            if (this.noteToCreate.type === 'noteText') {
                if (!this.text) {

                    return
                }
                const data = { txt: this.text }
                this.noteToCreate.info = data
            }
            if (this.noteToCreate.type === 'noteTodo') {
                if (!this.listItems) {

                    return
                }
                const data = { items: this.listItems }
                this.noteToCreate.info = data
            }
            if (this.noteToCreate.type === 'noteImg') {
                if (!this.url) {

                    return
                }
                const data = { url: this.url }
                this.noteToCreate.info = data
            }
            if (this.noteToCreate.type === 'noteVid') {
                if (!this.url) {

                    return
                }
                const data = { url: ytService.createNewUrl(this.url) }
                this.noteToCreate.info = data
            }
            noteService.save(this.noteToCreate)
                .then(() => {
                    this.ResetData()
                    eventBus.emit('noteCreate')
                    this.noteType = ''
                    this.title = ''
                })
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
        this.textEditUnsub()
        this.itemEditUnsub()
        this.itemDeleteUnsub()
        this.imgEditUnsub()
        this.vidEditUnsub()
        this.noteEditUnsub()
    }

}