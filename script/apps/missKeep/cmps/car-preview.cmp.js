export default {
    props:['car'],
    template:`
        <section class="car-preview">
            <p>Vendor: <strong>{{car.vendor}}</strong>  </p>
            <img :src="'img/' + car.vendor + '.png'" alt="">
            <p>Max speed: {{car.maxSpeed}} KMH</p>
            <router-link :to="'/car/'+car.id">Details</router-link>
            <hr />
            <pre>{{car}}</pre>
        </section>
    `,
    data(){
        return{}
    },
    created(){},
    methods:{},
    computed:{}
}