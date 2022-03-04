import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['index'],
    template: `
        <section class="note-list-item">
            <input v-model="text" type="text" placeholder="Add list item.." @input="updateCurrItem()" >
            <button type="button"></button>
        </section>
    `,
    data() {
        return {
            text: '',
            data: {}
        }
    },
    created() {

    },
    mounted() {},
    components: {
        eventBus
    },
    methods: {
        updateCurrItem() {
            this.data.text = this.text
            this.data.index = this.index
            eventBus.emit('itemEdit', this.data)
        }
    },
    computed: {

    },
    watch: {

    }
}