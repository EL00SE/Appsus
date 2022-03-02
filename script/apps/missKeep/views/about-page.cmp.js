import { eventBus } from '../services/eventBus-service.js'


const theData = { val: 'Bobo' }

export const aboutTeam = {
    template: `<section>
        <h2>Our Team is Amazing</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla excepturi odit totam labore ipsam recusandae corrupti aperiam, cum, quis, quaerat facere repellat omnis dolorem saepe veniam ab soluta non doloribus!</p>
        <input type="text" v-model="val" />
    </section>`,
    data() {
        return {...theData}
    }
}
export const aboutServices = {
    template: `<section>
        <h2>Our Services</h2>
        <ul>
            <li>Baba</li>
            <li>Mama</li>
            <li>Dada</li>
        </ul>
        <input type="text" v-model="val" />
    </section>`
}


export default {
    name: 'about-page',
    template: `
        <section class="about-page app-main">
            <h3>This is an about page</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa vel nesciunt eligendi alias dignissimos atque commodi repellat earum dolore labore dicta repudiandae ratione sapiente, quod odit vero! Excepturi, alias delectus?</p>
            <button @click="callBus">Call the bus</button>
            <button @click="ok = !ok">Toggle OK</button>
            <template v-if="ok">
                <h1>Title</h1>
                <p>Paragraph</p>
            </template>

            <hr>
            <nav>
                <router-link to="/about/team">Team</router-link> |
                <router-link to="/about/services">Services</router-link>
            </nav>
            <router-view></router-view>
            <input type="text" v-model="cmpType">
            <component :is="cmpType">BIG Badabum</component>

        </section>
    `,
    data() {
        return {
            ok: true,
            cmpType: 'h1'
        }
    },
    methods: {
        callBus() {
            console.log('Calling bus!');
            eventBus.emit('puk', 'test data')
        }
    },
    watch: {
        ok(val, oldVal){
            console.log(`OK was modified from ${oldVal} to ${val}, report the server`);
        }
    },
    components: {
        aboutTeam
    }
}