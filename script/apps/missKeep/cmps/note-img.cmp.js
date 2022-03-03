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
            img: "lib/assets/images/note-images/" + this.note.id
        }
    },
    created() {},
    methods: {},
    computed: {}
}