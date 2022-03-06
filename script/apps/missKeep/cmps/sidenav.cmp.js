import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <section class="side-nav-container">
            <ul class="nav">
                <li type="button" class="nav-items" @click="filterBy('noteText')">
                    <div class="icon nav-text"></div>
                    Text
                </li>
                <li type="button" class="nav-items" @click="filterBy('noteTodo')">
                    <div class="icon nav-todo"></div>
                    Todo
                </li>
                <li type="button" class="nav-items" @click="filterBy('noteImg')">
                    <div class="icon nav-img"></div>
                    Image
                </li>
                <li type="button" class="nav-items" @click="filterBy('noteVid')">
                    <div class="icon nav-vid"></div>
                    Video
                </li>
            </ul>
        </section>
    `,
    components: {

    },
    data() {
        return {
            noteType: '',
        }
    },
    created() {},
    methods: {
        filterBy(type) {
            if (this.noteType === type) { eventBus.emit('typeFilter', '') } else {
                this.noteType = type
                eventBus.emit('typeFilter', type)
            }

        }
    },
    computed: {

    },
    watch: {

    },
    unmounted() {}
}