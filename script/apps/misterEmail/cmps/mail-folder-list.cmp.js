

export default {
    template: `
        <section class="mail-folder-list">
        <div class="folder-list-container">    
        <p :class="isActive" @click="showFolder('all')"><i class="fa-solid fa-folder"></i>All</p>
        <p @click="showFolder('inbox')"><i class="fa-solid fa-inbox"></i>inbox 7</p>
        <p @click="showFolder('sent')"><i class="fa-solid fa-paper-plane"></i>sent</p>
        <p @click="showFolder('star')"><i class="fa-solid fa-star"></i>starred</p>
        <p @click="showFolder('archive')"><i class="fa-solid fa-box-archive"></i>archive</p>
        <p @click="showFolder('trash')"><i class="fa-solid fa-trash"></i>trash</p>
        <p @click="showFolder('read')"><i class="fas fa-envelope-open-text"></i>Read</p>
        <p @click="showFolder('unread')"><i class="fas fa-envelope"></i>Unread</p>
        </div>
        </section>
    `,
    data() {
        return {
            summeryOpen: false,
            onAll: false,
            onInbox: false,
            onSent: false,
            onStarred: false,
            onArchive: false,
            onTrash: false,
            onRead: false,
            onUnread: false,
        }
    },
    components: {

    },
    created() {
        console.log('hi');
    },
    methods: {
        showFolder(folder) {
            this.$emit('openFolder', folder)
        },
    },
    computed: {

    }
}