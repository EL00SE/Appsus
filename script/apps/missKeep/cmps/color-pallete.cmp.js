import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <section class="color-pallete">
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
            <button title="Gray" type="button" class="btn-gray" @click="changeColor('var(--color-gray)')"></button>
        </section>
    `,
    data() {
        return {

        }
    },
    created() {

    },
    components: {

    },
    methods: {
        changeColor(color) {
            eventBus.emit('colorChange', color)
            eventBus.emit('close')
        }
    },
    computed: {

    },
    watch: {

    }
}