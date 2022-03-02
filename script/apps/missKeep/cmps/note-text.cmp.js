export default {
    props: ['note'],
    template: `
        <section class="note-text">
            {{note.txt}}
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {},
    computed: {}
}