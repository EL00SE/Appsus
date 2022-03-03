import colorPallete from './color-pallete.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'
export default {
    template: `
        <section class="note-actions form-element flex">
            <button class="actions-btn color-btn" @click="openColorPallete()">color</button>
            <button class="actions-btn note-to-text-btn" @click="changeType(noteText)"></button>
            <button class="actions-btn note-to-todo-btn" @click="changeType(noteTodo)"></button>
            <button class="actions-btn note-to-img-btn" @click="changeType(noteImg)"></button>
            <button class="actions-btn note-to-vid-btn" @click="changeType(noteVid)"></button>
            <button class="actions-btn"></button>
            <color-pallete v-if="openPallete"></color-pallete>
        </section>
    `,
    data() {
        return {
            noteType: "noteText",
            openPallete: false
        }
    },
    created() {

    },
    components: {
        colorPallete,
        eventBus
    },
    methods: {
        openColorPallete() {
            this.openPallete = !this.openPallete
        }
    },
    computed: {

    },
    watch: {

    }
}