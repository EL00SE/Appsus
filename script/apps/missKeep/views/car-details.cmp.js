import { carService } from '../services/car-service.js';

export default {
    template: `
        <section v-if="car" class="car-details app-main">
            <h4>Car details - {{car.vendor}}</h4>
            <img :src="carImgUrl">
            <h5>Max speed:{{car.maxSpeed}}</h5>
            <h6>Techincal Description</h6>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolore blanditiis repudiandae sunt distinctio delectus reiciendis culpa tempora maxime nihil. Veritatis distinctio inventore non ea excepturi, laborum deserunt rem nam!</p>
            <pre>{{car}}</pre>
            <button @click="loadCar">Reload</button>
            <router-link :to="'/car/'+car.prevCarId">Prev Car</router-link> | 
            <router-link :to="'/car/'+car.nextCarId">Next Car</router-link> | 
            <router-link to="/car">Back to cars</router-link>
            
        </section>
        <section v-else class="loading">

        </section>
    `,
    data() {
        return {
            car: null
        };
    },
    created() {
        console.log('CarDetails CREATED');
    },
    computed: {
        carImgUrl() {
            return `img/${this.car.vendor}.png`;
        },
        carId() {
            return this.$route.params.carId
        }
    },
    methods: {
        loadCar() {
            carService.get(this.carId)
            .then(car => this.car = car);
        }
    },
    watch : {
        carId : {
            handler(){
                this.loadCar()
            },
            immediate : true,
        }
    }
};