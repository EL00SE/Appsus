import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
        <mail-preview></mail-preview>
        </section>
    `,
    components: {
        mailPreview,
    },
    methods: {

    },
    computed: {}
}