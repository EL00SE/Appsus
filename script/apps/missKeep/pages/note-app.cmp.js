import noteList from '../cmps/note-list.cmp.js'
import noteInput from '../cmps/note-input.cmp.js'
import sideNav from '../cmps/sidenav.cmp.js'

export default {
    template: `
        <section class="note-app main">
        <side-nav></side-nav>
        <note-input></note-input>
        <note-list></note-list>
        </section>
    `,
    components: {
        noteList,
        noteInput,
        sideNav
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