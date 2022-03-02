import { carService } from '../services/car-service.js';
import { eventBus } from '../services/eventBus-service.js';

export default {
    template: `
    
        <section v-if="carToEdit" class="car-edit app-main">
            <h4>{{formTitle}}</h4>
            <form @submit.prevent="save">
                <input type="text" required v-model="carToEdit.vendor" placeholder="Vendor">
                <input type="number" v-model.number="carToEdit.maxSpeed" placeholder="Max speed">
                <input type="checkbox" value="Jack" v-model="carToEdit.prevOwners" />  Jack
                <input type="checkbox" value="John" v-model="carToEdit.prevOwners" /> John

                <select v-model="selected" multiple>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </select>


                <button :disabled="!isValid">Save</button>
            </form>
            <hr />
            <pre>{{carToEdit}}</pre>
            <pre>{{selected}}</pre>
        </section>
    `,
    data() {
        return {
            carToEdit: carService.getEmptyCar(),
            selected: []
        };
    },
    created() {
        const id = this.$route.params.carId;
        if (id) {
            carService.get(id)
                .then(car => this.carToEdit = car);
        }
    },
    mounted(){
        this.$refs.vendor.focus()
    },
    methods: {
        save() {
            if (!this.carToEdit.vendor) return;
            carService.save(this.carToEdit)
                .then(car => {
                    eventBus.emit('show-msg', { txt: 'Saved succesfully', type: 'success' })
                    this.$router.push('/car')
                });
        }
    },
    computed: {
        formTitle() {
            const id = this.$route.params.carId;
            return id ? 'Edit car' : 'Add car';
        },
        isValid() {
            return !!this.carToEdit.vendor
        }
    },
    watch: {
        carToEdit : {
            handler() {
                console.log('Edited Car was changed');
            },
            deep: true
        }
    }
};