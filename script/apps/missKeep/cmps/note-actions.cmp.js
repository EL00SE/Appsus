import colorPallete from './color-pallete.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
export default {
    template: `
        <section class="note-actions form-element flex">
            <button title="Change note color" type="button" class="actions-btn color-btn" @click="openColorPallete($event)"></button>
            <button title="Make simple note" type="button" class="actions-btn note-to-text-btn" @click="changeType('noteText')"></button>
            <button title="Make list" type="button" class="actions-btn note-to-todo-btn" @click="changeType('noteTodo')"></button>
            <button title="Add image" type="button" class="actions-btn note-to-img-btn" @click="changeType('noteImg')"></button>
            <button title="Add YouTube video" type="button" class="actions-btn note-to-vid-btn" @click="changeType('noteVid')"></button>
            <button title="Save note" type="button" class="actions-btn save-btn" @click="save()"></button>
            <color-pallete :father="create" type="button" ref="ElColorPallete" v-if="openPallete" :style="{top: distanceY+'px',left:distanceX+'px'}"></color-pallete>
        </section>
    `,
    data() {
        return {
            // noteType: "noteText",
            openPallete: false,
            distanceX: 0,
            distanceY: 0
        }
    },
    created() {
        this.changeColorUnsub = eventBus.on('close', this.closeColorPallete)
    },
    components: {
        colorPallete,
        eventBus
    },
    methods: {
        openColorPallete(ev) {
            this.openPallete = !this.openPallete
            this.distanceX = ev.clientX
            this.distanceY = ev.clientY + 5
        },
        closeColorPallete() {
            this.openPallete = false
        },
        save() {
            eventBus.emit('save')
        },
        changeType(type) {
            this.closeColorPallete()
            eventBus.emit('typeChange', type)
        }
    },
    computed: {},
    mounted() {},
    updated() {},
    watch: {

    }
}