export default {
    props: ['note'],
    template: `
        <section class="note-text">
            {{note.info.title}}
            <p class="neat-p">{{note.info.txt}}</p>
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {},
    computed: {}
}