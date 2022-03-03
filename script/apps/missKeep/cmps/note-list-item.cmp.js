import { eventBus } from '.. / .. / .. / services / eventBus - service.js '

export default {
    props: ['idx'],
    template: `
        <section class="note-list-item">
            <input type="text" id="idx" placeholder="Add list item..">
            <button class="list-btn" @click="addListItem()"></button>
        </section>
    `,
    data() {
        return {

        }
    },
    created() {

    },
    components: {
        eventBus
    },
    methods: {
        addListItem() {
            eventBus.emit('addListItem')
        }
    },
    computed: {

    },
    watch: {

    }
}