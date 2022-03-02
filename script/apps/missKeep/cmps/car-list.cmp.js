import carPreview from './car-preview.cmp.js'

export default {
    props: ['cars'],
    template: `
        <section class="car-list">
            <ul>
                <li v-for="car in cars" :key="car.id" class="car-preview-container" >
                   <car-preview :car="car" />
                   <div class="actions">
                       <button @click="remove(car.id)">X</button>
                       <router-link :to="'/car/edit/'+car.id">Edit</router-link>
                   </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        carPreview
    },
    methods: {
        remove(id) {
            this.$emit('remove', id);
        },
        select(car) {
            this.$emit('selected', car);
        }
    },
    computed: {}
}