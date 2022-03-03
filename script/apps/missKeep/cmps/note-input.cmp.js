import { eventBus } from '../../../services/eventBus-service.js'
import noteCreate from './note-create.cmp.js'

export default {
    template: `
    <section ref="noteInput" class="note-input">
        <p v-if="isClosed" @click="expand()" >take a note...</p>
        <section v-if="isOpen" class="note-create-container">
            <note-create></note-create>
        </section>    
    </section>`,
    data() {
        return {
            isClosed: true,
            isOpen: false
        }
    },
    created() {},
    components: {
        noteCreate
    },
    methods: {
        expand() {
            this.isClosed = !this.isClosed
            this.isOpen = !this.isOpen
            this.$refs.noteInput.style.borderColor = 'black'
            this.$refs.noteInput.style.borderWidth = '3px'
            this.$refs.noteInput.style.borderStyle = 'solid'
        }
    },
    updated() {},
    unmounted() {}
}