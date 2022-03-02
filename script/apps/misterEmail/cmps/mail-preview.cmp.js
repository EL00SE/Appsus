export default {
    props: ['mail'],
    template: `
        <section class="mail-preview">
            <div class="grid mail-container unread">
            <i class="fa-solid fa-star mail-star"></i>
            <p class="mail-from">{{ mail.fromName }}</p>
            <p class="mail-subject">{{ mail.subject }}</p>
            <p class="mail-body read">{{ mail.body }}</p>
            <p class="mail-date read">{{ formatDate }}</p>
            <div class="mail-actions"></div>
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
        formatDate() {
            return moment(this.mail.sentAt).format('MMM DD')
        }
    }
}