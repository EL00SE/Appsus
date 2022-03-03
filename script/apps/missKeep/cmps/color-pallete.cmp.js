import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
        <section class="color-pallete">
            <button class="btn-def" @click="changeColor(--color-def)"></button>
            <button class="btn-red" @click="changeColor(--color-red)"></button>
            <button class="btn-orange" @click="changeColor(--color-orange)"></button>
            <button class="btn-yellow" @click="changeColor(--color-yellow)"></button>
            <button class="btn-green" @click="changeColor(--color-green)"></button>
            <button class="btn-blue" @click="changeColor(--color-blue)"></button>
            <button class="btn-lightblue" @click="changeColor(--color-lightblue)"></button>
            <button class="btn-darkblue" @click="changeColor(--color-darkblue)"></button >
            <button class="btn-purple" @click="changeColor(--color-purple)"></button>
            <button class="btn-pink" @click="changeColor(--color-pink)"></button>
            <button class="btn-brown" @click="changeColor(--color-brown)"></button>
            <button class="btn-gray" @click="changeColor(--color-gray)"></button>
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
            eventBus.emit('colorChange', { color })
        }
    },
    computed: {

    },
    watch: {

    }
}