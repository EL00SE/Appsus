import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <section class="color-pallete">
            <button class="btn-def" @click="changeColor('var(--color-def)')"></button>
            <button class="btn-red" @click="changeColor('var(--color-red)')"></button>
            <button class="btn-orange" @click="changeColor('var(--color-orange)')"></button>
            <button class="btn-yellow" @click="changeColor('var(--color-yellow)')"></button>
            <button class="btn-green" @click="changeColor('var(--color-green)')"></button>
            <button class="btn-blue" @click="changeColor('var(--color-blue)')"></button>
            <button class="btn-lightblue" @click="changeColor('var(--color-lightblue)')"></button>
            <button class="btn-darkblue" @click="changeColor('var(--color-darkblue)')"></button >
            <button class="btn-purple" @click="changeColor('var(--color-purple)')"></button>
            <button class="btn-pink" @click="changeColor('var(--color-pink)')"></button>
            <button class="btn-brown" @click="changeColor('var(--color-brown)')"></button>
            <button class="btn-gray" @click="changeColor('var(--color-gray)')"></button>
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