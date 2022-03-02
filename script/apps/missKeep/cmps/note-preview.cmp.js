import noteText from "./note-text.cmp.js"

export default {
    props: ['note'],
    template: `
        <section class="note-preview">
           <component :is="note.type" :note="note"></component>
        </section>
    `,
    data() {
        return {
            cmpType: this.note.type
        }
    },
    created() { },
    components: {
        noteText
    },
    methods: {},
    computed: {}
}