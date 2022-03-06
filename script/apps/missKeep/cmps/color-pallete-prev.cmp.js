import { noteService } from '../services/note-service.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['note'],
    template: `
        <section class="color-pallete-prev">
            <button title="Default" type="button" class="btn-def" @click="changeColor('var(--color-def)')"></button>
            <button title="Red" type="button" class="btn-red" @click="changeColor('var(--color-red)')"></button>
            <button title="Orange" type="button" class="btn-orange" @click="changeColor('var(--color-orange)')"></button>
            <button title="Yellow" type="button" class="btn-yellow" @click="changeColor('var(--color-yellow)')"></button>
            <button title="Green" type="button" class="btn-green" @click="changeColor('var(--color-green)')"></button>
            <button title="Blue" type="button" class="btn-blue" @click="changeColor('var(--color-blue)')"></button>
            <button title="Light Blue" type="button" class="btn-lightblue" @click="changeColor('var(--color-lightblue)')"></button>
            <button title="Dark Blue" type="button" class="btn-darkblue" @click="changeColor('var(--color-darkblue)')"></button >
            <button title="Purple" type="button" class="btn-purple" @click="changeColor('var(--color-purple)')"></button>
            <button title="Pink" type="button" class="btn-pink" @click="changeColor('var(--color-pink)')"></button>
            <button title="Brown" type="button" class="btn-brown" @click="changeColor('var(--color-brown)')"></button>
            <button title="White" type="button" class="btn-gray" @click="changeColor('var(--color-gray)')"></button>
            <button title="Close color pallete" type="button" class="color-pallete-close-btn" @click="closeColorPallete()"></button>
        </section>
    `,
    data() {
        return {
            noteId: this.note.id
        }
    },
    created() {},
    mounted() {},
    components: {
        eventBus,
        noteService
    },
    methods: {
        changeColor(color) {
            noteService.get(this.noteId)
                .then(note => {
                    note.color = color
                    noteService.save(note)
                    eventBus.emit('changeColorPrev', color)
                })
        },
        closeColorPallete() {
            eventBus.emit('close')
        }

    },
    computed: {

    },
    watch: {

    },
    unmounted() {}
}