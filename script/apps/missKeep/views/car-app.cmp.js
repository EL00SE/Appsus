import { carService } from '../services/car-service.js';
import { showErrorMsg, showSuccessMsg } from '../services/eventBus-service.js';
import carFilter from '../cmps/car-filter.cmp.js';
import carList from '../cmps/car-list.cmp.js';
import carEdit from './car-edit.cmp.js';

export default {
    name: 'car-app',
    template: `
        <section class="car-app app-main">
           <car-filter @filtered="setFilter" />
           <router-link to="/car/edit">Add a new car</router-link>
           <car-list :cars="carsForDisplay" @remove="removeCar" />
        </section>
    `,
    components: {
        carFilter,
        carList,
        carEdit,
    },
    data() {
        return {
            cars: null,
            filterBy: null
        };
    },
    created() {
        carService.query()
            .then(cars => this.cars = cars);
    },
    methods: {
        removeCar(id) {
            carService.remove(id)
                .then(() => {
                    const idx = this.cars.findIndex((car) => car.id === id);
                    this.cars.splice(idx, 1);
                    showSuccessMsg('Deleted succesfully');
                })
                .catch(err => {
                    console.error(err);
                    showErrorMsg('Error - please try again later')
                });
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        carsForDisplay() {
            if (!this.filterBy) return this.cars;
            const regex = new RegExp(this.filterBy.vendor, 'i');
            return this.cars.filter(car => regex.test(car.vendor));
        }
    },
};
