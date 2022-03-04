import { mailService } from '../services/mail-service.js';

export default {
    props: ['unreadAmount'],
    template: `
        <section class="mail-folder-list">
        <div class="folder-list-container">    
        <p @click="showFolder('all'); onAll = true" :class="allActive"><i class="fa-solid fa-folder"></i>All</p>
        <p @mouseenter="onInboxHover=true" @mouseleave="onInboxHover=false"  @click="showFolder('inbox'); onInbox = true" :class="inboxActive"><i class="fa-solid fa-inbox mail-unread-icon" :class="inboxActiveIcon"></i>inbox<span class="mail-unread-amount">{{unreadAmount}}</span></p>
        <p @click="showFolder('sent'); onSent = true" :class="sentActive" ><i class="fa-solid fa-paper-plane"></i>sent</p>
        <p @click="showFolder('star'); onStarred = true" :class="starActive"><i class="fa-solid fa-star"></i>starred</p>
        <p @click="showFolder('archive'); onArchive = true" :class="archiveActive"><i class="fa-solid fa-box-archive"></i>archive</p>
        <p @click="showFolder('trash'); onTrash = true" :class="trashActive"><i class="fa-solid fa-trash"></i>trash</p>
        <p @click="showFolder('read'); onRead = true" :class="readActive"><i class="fas fa-envelope-open-text"></i>Read</p>
        <p @click="showFolder('unread'); onUnread = true" :class="unreadActive"><i class="fas fa-envelope"></i>Unread</p>
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
            onInboxHover: false
            // unRead: this.unreadAmount
        }
    },
    components: {

    },
    created() {
        // console.log(this.unRead);
    },
    mounted() {
        // console.log(mailService.getUnreadAmount());
        // this.unreadAmount = mailService.getUnreadAmount()

    },
    methods: {
        showFolder(folder) {
            this.$emit('openFolder', folder)
            var data = this.$data
            console.log(data);
            for (var dataProp in data) {
                data[dataProp] = false
                // console.log(Object.keys(data)[0])
            }
        },
        activeFolder(folder) {
            // debugger
            var data = this.$data
            console.log(data);
            for (var dataProp in data) {
                dataProp = false
                console.log(dataProp);
            }
            this[folder] = true
            return this[folder]
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
            console.log(mailService.getUnreadAmount());
            return mailService.getUnreadAmount()
        }

    }
}