import noteText from "./note-text.cmp.js"

export default {
    props: ['note'],
    template: `
        <section class="note-preview">
           <component :is="note.type" :note="note"/>
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    components: {
        noteText
    },
    methods: {},
    computed: {}
}