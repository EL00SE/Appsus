import { eventBus } from '../../../services/eventBus-service.js'
export default {
    props: ['note'],
    template: `
        <section class="note-vid">
            {{note.title}}
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