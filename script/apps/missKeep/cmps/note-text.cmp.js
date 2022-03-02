export default {
    props: ['note'],
    template: `
        <section class="note-text">
            {{note.info.txt}}
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {},
    computed: {}
}