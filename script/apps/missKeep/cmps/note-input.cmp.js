import noteCreate from './note-create.cmp.js'

export default {
    template: `
    <section class="note-input">
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
    components: {
        noteCreate
    },
    methods: {
        expand() {
            this.isClosed = !this.isClosed
            this.isOpen = !this.isOpen
        }
    },
    computed: {}
}