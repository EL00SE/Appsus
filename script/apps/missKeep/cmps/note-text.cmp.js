export default {
    props: ['currNote'],
    template: `
        <section class="note-text">
            {{currNote.txt}}
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {},
    computed: {}
}