import { eventBus } from '../../../services/eventBus-service.js'
import noteCreate from './note-create.cmp.js'

export default {
    template: `
    <section ref="noteInput" class="note-input">
        <section class="note-create-container">
            <note-create></note-create>
        </section>    
    </section>`,
    data() {
        return {}
    },
    created() {},
    components: {
        noteCreate
    },
    methods: {},
    updated() {},
    unmounted() {}
}