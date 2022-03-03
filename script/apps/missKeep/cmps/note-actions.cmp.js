import colorPallete from './color-pallete.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
export default {
    template: `
        <section class="note-actions form-element flex">
            <button class="actions-btn color-btn" @click="openColorPallete($event)"></button>
            <button class="actions-btn note-to-text-btn" @click="changeType(noteText)"></button>
            <button class="actions-btn note-to-todo-btn" @click="changeType(noteTodo)"></button>
            <button class="actions-btn note-to-img-btn" @click="changeType(noteImg)"></button>
            <button class="actions-btn note-to-vid-btn" @click="changeType(noteVid)"></button>
            <button class="actions-btn save-btn" @click="save()"></button>
            <color-pallete ref="ElColorPallete" v-if="openPallete" :style="{top: distanceY+'px',left:distanceX+'px'}"></color-pallete>
        </section>
    `,
    data() {
        return {
            noteType: "noteText",
            openPallete: false,
            distanceX: 0,
            distanceY: 0
        }
    },
    created() {
        this.unsubscrive = eventBus.on('close', this.closeColorPallete)
    },
    components: {
        colorPallete,
        eventBus
    },
    methods: {
        openColorPallete(ev) {
            this.openPallete = !this.openPallete
            this.distanceX = ev.clientX + 10
            this.distanceY = ev.clientY + 10
        },
        closeColorPallete() {
            this.openPallete = !this.openPallete
        },
        save() {
            eventBus.emit('save')
        }
    },
    computed: {},
    mounted() {},
    updated() {},
    watch: {}
}