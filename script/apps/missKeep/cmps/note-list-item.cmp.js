import { eventBus } from '../../../services/eventBus-service.js'
import { utilService } from '../../../services/util-service.js'


export default {
    props: ['text', 'index', 'color'],
    template: `
        <section v-if="isShown" class="note-list-item flex">
            <input :style="{backgroundColor: color}" v-model="itemText" type="text" placeholder="Add list item.." class="list-item form-input" @input="updateCurrItem()" >
            <button type="button" class="delete-btn" @click="deleteItem()"></button>
        </section>
    `,
    data() {
        return {
            isShown: true,
            itemText: this.text,
            data: {}
        }
    },
    created() {
        this.data.index = this.index
    },
    mounted() {},
    components: {
        eventBus,
        utilService
    },
    methods: {
        updateCurrItem() {
            this.data.text = this.itemText
            eventBus.emit('itemEdit', this.data)
        },
        deleteItem() {
            this.isShown = false
            this.data.text = ''
            eventBus.emit('itemDelete', this.data)
        },

    },
    computed: {

    },
    watch: {

    }
}