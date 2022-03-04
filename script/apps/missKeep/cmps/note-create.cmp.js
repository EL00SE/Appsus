import noteActions from './note-actions.cmp.js'
import noteListItem from './note-list-item.cmp.js'
import noteImgInput from './note-img-input.cmp.js'
import noteVidInput from './note-vid-input.cmp.js'
import { noteService } from '../services/note-service.js'
import { ytService } from '../services/note-youtube-service.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <form ref="noteForm" class="note-create">
            <input ref="noteTitleInput" type="text" v-model="noteToCreate.title" placeholder="Title" class="form-element"/>
            <textarea ref="noteText" v-if="noteType === 'noteText'"  v-model="text" cols="30" rows="10" placeholder="Take a note..." class="form-element"></textarea>
            <ul ref="noteTodo" v-if="noteType === 'noteTodo'" >
                <note-list-item ref="noteTodoItem" v-for="(item, index) in listItems" :key="index" :index="index" ></note-list-item>
                <button type="button" @click="addListItem()">Add</button>
            </ul>
            <note-img-input ref="noteImg" v-if="noteType === 'noteImg'" ></note-img-input>
            <note-vid-input ref="noteVid" v-if="noteType === 'noteVid'" ></note-vid-input>
            <note-actions></note-actions>
        </form>
    `,
    data() {
        return {
            noteToCreate: noteService.getEmptyNote(),
            noteType: 'noteText',
            text: '',
            listItems: [],
            url: '',
        }
    },
    created() {
        this.colorUnsub = eventBus.on('colorChange', this.changeColor)
        this.saveUnsub = eventBus.on('save', this.save)
        this.typeUnsub = eventBus.on('typeChange', this.changeType)
        this.itemEditUnsub = eventBus.on('itemEdit', this.editItem)
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
        noteImgInput,
        noteVidInput
    },
    methods: {
        save() {
            if (this.noteType === 'noteText') {
                if (!this.text) {

                    return
                }
                this.noteToCreate.info.txt = this.text
            }
            if (this.noteType === 'noteTodo') {
                if (!this.listItems) {

                    return
                }
                this.noteToCreate.info.items = this.listItems
            }
            if (this.noteType === 'noteImg') {
                if (!this.url) {

                    return
                }
                this.noteToCreate.info.url = this.url
            }
            if (this.noteType === 'noteVid') {
                if (!this.url) {

                    return
                }
                this.noteToCreate.info.url = ytService.createNewUrl(this.url)
            }
            noteService.save(this.noteToCreate)
                .then(note => {
                    eventBus.emit('noteCreate')

                })
        },
        changeColor(color) {
            this.noteToCreate.color = color
            this.$refs.noteForm.style.backgroundColor = color
            this.$refs.noteTitleInput.style.backgroundColor = color
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
        editImgUrl(url) {
            this.url = url
        },
        editVidUrl(url) {
            this.url = url
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
        this.imgEditUnsub()
        this.vidEditUnsub()
    }

}