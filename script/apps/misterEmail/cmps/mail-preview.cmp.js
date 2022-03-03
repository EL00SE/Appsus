import mailSummery from './mail-summery.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['mail'],
    template: `
        <section>
            <div class="mail-preview grid mail-container" @mouseenter="hover=true" @mouseleave="hover=false" @click="summeryOpen=!summeryOpen; mail.isRead=true" :class="btnRead.class">
            <div class="flex center align-center">
            <div @click.stop="starMail(mail, !mail.isStar)" ><i :class="setStar" @mouseenter="starHover=true" @mouseleave="starHover=false"></i></div>
            </div>
            <p class="mail-from">{{ mail.fromName }}</p>
            <p class="mail-subject">{{ mail.subject }}</p>
            <p class="mail-body">{{ mail.body }}</p>
            <p v-if="!hover" class="mail-date">{{ formatDate }}</p>
            <div v-if="hover" class="mail-actions flex center align-center">
            <div @click.stop="archiveMail(mail, !mail.isArchived)" class="mail-archive"><i class="fa-solid fa-box-archive "></i></div>
            <div @click.stop="markRead(mail, !mail.isRead)" class="mail-read"><i :class="btnRead.icon" ></i></div>
            <div @click.stop="trashMail(mail, mail.isTrash)" class="mail-trash"><i class="fa-solid fa-trash "></i></div>
            </div>
            </div>
            <mail-summery :mail="mail" v-if="summeryOpen"></mail-summery>
            <!-- <hr> -->
        </section>
    `,
    data() {
        return {
            hover: false,
            starHover: false,
            summeryOpen: false
        }
    },
    components: {
        mailSummery
    },
    created() {
        // console.log(this.title);

    },
    methods: {
        trashMail(mail, isTrash) {
            console.log(isTrash);
            isTrash ? eventBus.emit('removed', mail) : eventBus.emit('trashed', mail)
        },
        markRead(mail, isRead) {
            eventBus.emit('read', { mail: mail, state: isRead })
        },
        archiveMail(mail, isArchived) {
            eventBus.emit('archived', { mail: mail, state: isArchived })
        },
        starMail(mail, isStar) {
            eventBus.emit('starred', { mail: mail, state: isStar })
        },
        openSummery() {
            this.summeryOpen = !this.summeryOpen
            this.$emit('summeryOpen', this.summeryOpen)
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
            if (this.mail.isStar) return 'fa-solid fa-star mail-star starred'
            return this.starHover ? 'fa-solid fa-star mail-star' : 'fa-regular fa-star mail-star'
        },
        mailStar() {
            return this.mail.isStar ? 'fa-solid fa-star mail-star' : 'fa-regular fa-star mail-star'
        },
    }
}