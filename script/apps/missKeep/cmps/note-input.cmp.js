import noteCreate from './note-create.cmp.js'

export default {
    template: `
    <section class="note-input">
        <p v-if="isClosed" @click="expand()" >take a note...</p>
        <section v-if="!isClosed">
            <note-create></note-create>
        </section>    
    </section>`,
    components: {
        noteCreate
    },
    data() {
        return {
            isClosed: true
        }
    },
    components: {},
    methods: {
        expand() {
            this.isClosed = !this.isClosed
        }
    },
    computed: {}
}