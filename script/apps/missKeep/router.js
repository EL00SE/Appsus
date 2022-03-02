<<<<<<< HEAD
import noteApp from './views/note-app.cmp.js';

const routes = []
=======
import carApp from './views/car-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage, { aboutTeam, aboutServices } from './views/about-page.cmp.js'
import carDetails from './views/car-details.cmp.js'
import carEdit from './views/car-edit.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'team',
                component: aboutTeam
            },
            {
                path: 'services',
                component: aboutServices
            },
        ]
    },
    {
        path: '/car',
        component: carApp
    },
    {
        path: '/car/:carId',
        component: carDetails
    },
    {
        path: '/car/edit/:carId?',
        component: carEdit
    },
]
>>>>>>> 6937a0c20603565217f5aa5e6050b8d1e756a8e4

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})