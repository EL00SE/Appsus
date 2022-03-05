export default {
    props: ['note'],
    template: `
        <section class="note-text">
            {{note.title}}
            <pre class="neat-pre">{{this.note.info.txt}}</pre>
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {

    },
    computed: {}
}