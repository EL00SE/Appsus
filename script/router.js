import homePage from './pages/home-page.cmp.js'
import noteApp from './apps/missKeep/pages/note-app.cmp.js'
// import emailApp from './pages/email-app.cmp.js'
// import emailDetails from './cmps-email/email-details.cmp.js'
import emailApp from './apps/misterEmail/pages/email-app.cmp.js'
import emailDetails from './apps/misterEmail/pages/email-details.cmp.js'
// import bookApp from '../js/pages/book-app.cmp.js'
// import bookDetails from '../js/pages/book-details.cmp.js'
// import noteCreate from './cmps-notes/note-create.cmp.js'

const routes = [{
        path: "/",
        component: homePage,
    },
    {
        path: "/note",
        name: 'note',
        component: noteApp,
    },
    {
        path: "/email/:folder",
        component: emailApp,
    },
    {
        path: "/email/:mailId",
        component: emailDetails,
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    // {
    //     path: '/email/:folder?',
    //     component: emailApp
    // },
];
export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});