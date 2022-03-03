export default {
    props: ['note'],
    template: `
        <section class="note-img">
            {{note.info.title}}
        <iframe :src="url" frameborder="0" width="100%"></iframe>
        </section>

    `,
    data() {
        return {
            url: this.note.info.url
        }
    },
    components: {},
    created() {},
    methods: {},
    computed: {}
}