export default {
    props: ['mail'],
    template: `
        <section class="mail-preview">
            <div>
            <p>{{ mail.subject }}</p>
            <p>{{ mail.body }}</p>
            </div>
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