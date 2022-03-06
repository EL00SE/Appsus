// export default {
//     template: `
//         <header class="app-header">
//             <div class="logo">
//                 <h3>Appsus</h3>
//             </div>
//             <nav class="">
//                 <router-link to="/">Home</router-link> |
//                 <router-link to="/email">Mail</router-link> |
//                 <router-link to="/about">About</router-link> |
//                 <router-link to="/note">Note</router-link> |
//                 <a href="https://amitmi1.github.io/MissBook/#/">Book</a>
//             </nav>
//         </header>

//     `
// }



export default {
    template: `
        <header class="app-header">
            <div ref="hero" class="header">
            <nav class="nav-bar">
                    <router-link to="/">Home</router-link> |
                    <router-link to="/email">Mail</router-link> |
                    <router-link to="/Note">Note</router-link>
                </nav>
                <div class="sides">
               
            <div class="info">
            <h1 v-model="page">APP SUS</h1>
            </div>
            </div>
            </div>
        </header>
    
    `,
    created() {
    },
    data() {
        return {
            page: ''
        }
    },
    unmounted() {
    },
    methods: {

    },
    computed: {

    },

}