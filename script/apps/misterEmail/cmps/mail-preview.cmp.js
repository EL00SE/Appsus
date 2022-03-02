export default {
    props: ['mail'],
    template: `
        <section class="mail-preview">
            <div class="flex align-center">
            <p>{{ mail.subject }}</p>
            <div class="mail-body">{{ mail.body }}</div>
            </div>
            <hr>
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