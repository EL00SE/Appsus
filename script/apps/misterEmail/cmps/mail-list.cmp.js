import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
        <ul class="clean-list flex wrap space-evenly">
                <li v-for="mail in mails" :key="mail.id" class="mail-preview-container" >
                   <mail-preview :mail="mail"/>
                   <!-- <hr> -->
                   <div class="actions">
                   </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        mailPreview,
    },
    methods: {

    },
    computed: {}
}