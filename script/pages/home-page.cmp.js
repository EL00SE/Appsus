export default {
    template: `
        <section class="">
            <div class="home-container flex align-center center">
                <img @click="$router.push('/email')" src="./lib/assets/images/mail.png" title="Mail" alt="">
                <img @click="$router.push('/Note')" src="./lib/assets/images/note.png" title="Notes" alt="">
            </div>
        </section>
    `,
    data() {
        return {

        }
    },
    created() {

    },
    components: {

    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
}