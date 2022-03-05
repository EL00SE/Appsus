import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['url', 'color'],
    template: `
        <section :style="{backgroundColor: color}" class="note-img-input">
            <input :style="{backgroundColor: color}" class="form-input" v-model="imgUrl" type="text" placeholder="Enter image url" @input="updateUrl()">
        </section>
    `,
    data() {
        return {
            imgUrl: this.url
        }
    },
    created() {},
    components: {

    },
    methods: {
        updateUrl() {
            eventBus.emit('imgUrlEdit', this.url)
        },
    },
    computed: {

    },
    watch: {

    },
    unmounted() {},
}