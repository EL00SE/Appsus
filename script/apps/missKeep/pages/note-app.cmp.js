import noteList from '../cmps/note-list.cmp.js'
import { noteService } from '../services/note-service.js'

export default {
    template: `
        <section class="note-app main">
        <note-list :notes="notes"></note-list>
        </section>
    `,
    components: {
        noteList
    },
    data() {
        return {
            notes: null,
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
}