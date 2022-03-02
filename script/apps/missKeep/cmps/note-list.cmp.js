import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id" class="note-preview-container" @click="expand(note.id)" >
                   <note-preview :note="note"></note-preview>
                   <div class="actions">
                       <button @click="remove(note.id)">X</button>
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
        expand(id) {
            this.$router.push('/edit/' + id)
        }
    },
    computed: {}
}