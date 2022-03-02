import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id" class="note-preview-container" >
                   <note-preview :note="note" />
                   <div class="actions">
                       <button @click="remove(note.id)">X</button>
                       <router-link :to="'/note/edit/'+note.id">Edit</router-link>
                   </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        notePreview
    },
    methods: {
        remove(id) {
            this.$emit('remove', id);
        },
        select(note) {
            this.$emit('selected', note);
        }
    },
    computed: {}
}