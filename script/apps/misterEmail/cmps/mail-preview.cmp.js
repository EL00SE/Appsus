import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['mail'],
    template: `
        <section class="mail-preview" @mouseenter="hover=true" @mouseleave="hover=false">
            <div class="grid mail-container" :class="btnRead.class">
            <div class="flex center align-center">
            <i :class="setStar" @mouseenter="starHover=true" @mouseleave="starHover=false"></i>
            </div>
            <p class="mail-from">{{ mail.fromName }}</p>
            <p class="mail-subject">{{ mail.subject }}</p>
            <p class="mail-body read">{{ mail.body }}</p>
            <p v-if="!hover" class="mail-date read">{{ formatDate }}</p>
            <div v-if="hover" class="mail-actions flex center align-center">
            <div class="mail-archive"><i class="fa-solid fa-box-archive "></i></div>
            <div @click="e => !mail.isRead && markRead(mail)" class="mail-read"><i :class="btnRead.icon" ></i></div>
            <div @click="trashMail(mail)" class="mail-trash"><i class="fa-solid fa-trash "></i></div>
            </div>
            </div>
            <!-- <hr> -->
        </section>
    `,
    data() {
        return {
            hover: false,
            starHover: false
        }
    },
    created() {
        // console.log(this.title);

    },
    methods: {
        trashMail(mail) {
            eventBus.emit('removed', mail)
        },
        markRead(mail) {
            eventBus.emit('read', mail)
        }

    },
    computed: {
        formatDate() {
            return moment(this.mail.sentAt).format('MMM DD')
        },
        btnRead() {
            return this.mail.isRead ? {
                icon: 'fas fa-envelope-open-text',
                class: 'read'
            } :
                {
                    icon: 'fas fa-envelope',
                    class: 'unread'
                }
        },
        setStar() {
            return this.starHover ? 'fa-solid fa-star mail-star' : 'fa-regular fa-star mail-star'

            console.log(this.$refs);
            // this.$refs.mailStar.classList.value = 'fa-solid fa-star mail-star'
        }
    }
}