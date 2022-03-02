import { router } from './router.js'
import appFooter from '../../cmps/app-footer.cmp'
import appHeader from '../../cmps/app-header.cmp'

const options = {
    template: `
        <section>
            <app-header />
            <router-view />
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        appFooter,
        userMsg
    }
}



const app = Vue.createApp(options)
app.use(router)
app.mount('#app')