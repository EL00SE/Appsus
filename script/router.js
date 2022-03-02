import homePage from './pages/appsus-home-page.cmp.js'
import noteApp from './apps/missKeep/pages/note-app.cmp.js'
import emailApp from './pages/email-app.cmp.js'
import emailDetails from './cmps-email/email-details.cmp.js'
import noteEdit from './apps/missKeep/pages/note-edit.cmp.js'
import noteCreate from './apps/missKeep/pages/note-create.cmp.js'
import bookApp from '../js/pages/book-app.cmp.js'
import bookDetails from '../js/pages/book-details.cmp.js'
import noteCreate from './cmps-notes/note-create.cmp.js'

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
        path: "/note/:noteId?/edit",
        component: noteEdit,
    },
    {
        path: "/note/:noteId?/new",
        component: noteCreate,
    },
    {
        path: "/email",
        component: emailApp,
    },
    {
        path: "/email/:emailId?",
        component: emailDetails,
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId?',
        component: bookDetails
    },
];
export const router = new VueRouter({ routes })