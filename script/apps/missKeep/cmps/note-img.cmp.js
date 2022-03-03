export default {
    props: ['note'],
    template: `
        <section class="note-img">
            {{note.info.title}}
        <img :src=this.img alt="x">
        </section>
    `,
    data() {
        return {
            img: "script/apps/missKeep/note-images/" + this.note.id
        }
    },
    created() {},
    methods: {},
    computed: {}
}