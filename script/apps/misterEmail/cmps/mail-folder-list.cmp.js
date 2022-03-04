

export default {
    template: `
        <section class="mail-folder-list">
        <p @click="showFolder('all')">All</p>
        <p @click="showFolder('inbox')">inbox 7</p>
        <p @click="showFolder('sent')">sent</p>
        <p @click="showFolder('star')">starred</p>
        <p @click="showFolder('archive')">archive</p>
        <p @click="showFolder('trash')">trash</p>
        <p @click="showFolder('read')">Read</p>
        <p @click="showFolder('unread')">Unread</p>
        </section>
    `,
    data() {
        return {
            summeryOpen: false
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