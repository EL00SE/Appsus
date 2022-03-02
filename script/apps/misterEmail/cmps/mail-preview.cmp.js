export default {
    props: ['mail'],
    template: `
        <section class="mail-preview">
            <h3>{{ mail.subject }}</h3>
            <h3>{{ mail.body }}</h3>

        </section>
    `,
    data() {
        return {

        }
    },
    created() {
        // console.log(this.title);

    },
    methods: {

    },
    computed: {

    }
}