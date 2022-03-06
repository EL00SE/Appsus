import { mailService } from '../services/mail-service.js';

export default {
    props: ['unreadAmount'],
    template: `
        <section class="mail-folder-list">
            <button @click="compose" class="flex align-center btn-compose"><img src="./lib/assets/images/icons/compose.png" alt=""><span>COMPOSE</span></button>   
        <div class="folder-list-container"> 
        <p @click="showFolder('all'); onAll = true" :class="allActive"><i class="fa-solid fa-folder"></i><span class="mail-folder-name">All</span></p>
        <p @mouseenter="onInboxHover=true" @mouseleave="onInboxHover=false"  @click="showFolder('inbox'); onInbox = true" :class="inboxActive">
            <i class="fa-solid fa-inbox mail-unread-icon" :class="inboxActiveIcon"></i>
            <span class="mail-folder-name">inbox</span>
            <span class="mail-unread-amount">{{unreadAmount}}</span></p>
        <p @click="showFolder('sent'); onSent = true" :class="sentActive" ><i class="fa-solid fa-paper-plane"></i><span class="mail-folder-name">sent</span></p>
        <p @click="showFolder('star'); onStarred = true" :class="starActive"><i class="fa-solid fa-star"></i><span class="mail-folder-name">starred</span></p>
        <p @click="showFolder('archive'); onArchive = true" :class="archiveActive"><i class="fa-solid fa-box-archive"></i><span class="mail-folder-name">archive</span></p>
        <p @click="showFolder('trash'); onTrash = true" :class="trashActive"><i class="fa-solid fa-trash"></i><span class="mail-folder-name">trash</span></p>
        <p @click="showFolder('read'); onRead = true" :class="readActive"><i class="fas fa-envelope-open-text"></i><span class="mail-folder-name">Read</span></p>
        <p @click="showFolder('unread'); onUnread = true" :class="unreadActive"><i class="fas fa-envelope"></i><span class="mail-folder-name">Unread</span></p>
        </div>
        </section>
    `,
    data() {
        return {
            summeryOpen: false,
            onAll: false,
            onInbox: true,
            onSent: false,
            onStarred: false,
            onArchive: false,
            onTrash: false,
            onRead: false,
            onUnread: false,
            onInboxHover: false,
            isCompose: false
        }
    },
    components: {

    },
    created() {
    },
    mounted() {


    },
    methods: {
        showFolder(folder) {
            this.$emit('openFolder', folder)
            var data = this.$data
            for (var dataProp in data) {
                data[dataProp] = false
            }
        },
        activeFolder(folder) {
            var data = this.$data
            for (var dataProp in data) {
                dataProp = false
            }
            this[folder] = true
            return this[folder]
        },
        compose() {
            this.isCompose = !this.isCompose
            this.$emit('compose')
        }
    },
    computed: {
        allActive() {
            if (this.onAll) return 'active'
        },
        inboxActive() {
            if (this.onInbox) return 'active-inbox '
        },
        sentActive() {
            if (this.onSent) return 'active'
        },
        starActive() {
            if (this.onStarred) return 'active'
        },
        archiveActive() {
            if (this.onArchive) return 'active'
        },
        trashActive() {
            if (this.onTrash) return 'active'
        },
        readActive() {
            if (this.onRead) return 'active'
        },
        unreadActive() {
            if (this.onUnread) return 'active'
        },
        inboxActiveIcon() {
            if (this.onInbox || this.onInboxHover) return 'active-inbox-icon'
        },
        formatUnread() {
            return mailService.getUnreadAmount()
        }

    }
}