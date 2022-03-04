import noteList from '../cmps/note-list.cmp.js'
import noteInput from '../cmps/note-input.cmp.js'

export default {
    template: `
        <section class="note-app main">
        <note-input></note-input>
        <note-list ></note-list>
        </section>
    `,
    components: {
        noteList,
        noteInput
    },
    data() {
        return {

        }
    },
    created() {},
    methods: {

    },
    computed: {

    },
    watch: {

    }
}