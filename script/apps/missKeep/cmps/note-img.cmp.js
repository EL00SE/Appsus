export default {
    props: ['note'],
    template: `
        <section class="note-img">
            {{note.title}}
        <img :src="url" alt="x">
        </section>
    `,
    data() {
        return {
            url: this.note.info.url
        }
    },
    created() {},
    methods: {},
    computed: {}
}