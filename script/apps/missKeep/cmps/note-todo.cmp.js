export default {
    props: ['note'],
    template: `
        <section class="note-todo">
            {{note.title}}
            <p v-for="item in note.info.items" class="neat-p">{{item}}</p>
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {},
    computed: {}
}