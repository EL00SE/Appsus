export default {
    props: ['mail'],
    template: `
        <section class="mail-preview">
            <div class="flex align-center mail-container unread">
                <p class="mail-from">{{ mail.fromName }}</p>
                <!-- <p class="mail-from">{{ mail.fromEmail }}</p> -->
            <p class="mail-subject">{{ mail.subject }}</p>
            <div class="mail-body read">{{ mail.body }}</div>
            </div>
            <!-- <hr> -->
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