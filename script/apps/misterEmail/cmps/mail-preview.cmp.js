import mailSummery from './mail-summery.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    props: ['mail'],
    template: `
        <section class="mail-preview-container">
            <div class="mail-preview grid mail-container" @mouseenter="hover=true" @mouseleave="hover=false" @click.stop="toggleSummery" :class="btnRead.class">
            <div class="flex center align-center">
            <div @click.stop="starMail(mail, !mail.isStar)" class="star-mail"><i :class="setStar" @mouseenter="starHover=true" @mouseleave="starHover=false"></i></div>
            </div>
            <p class="mail-from">{{ formatName }}</p>
            <p class="mail-subject">{{ mail.subject }}</p>
            <p class="mail-body">{{ mail.body }}</p>
            <p v-if="!hover" class="mail-date">{{ formatDate }}</p>
            <div v-if="hover" class="mail-actions flex center align-center">
            <div @click.stop="openFull" class="mail-expand"><i class="fa-solid fa-expand"></i></div>
            <div @click.stop="archiveMail(mail, !mail.isArchived)" class="mail-archive"><i class="fa-solid fa-box-archive "></i></div>
            <div @click.stop="markRead(mail, !mail.isRead)" class="mail-read"><i :class="btnRead.icon" ></i></div>
            <div @click.stop="trashMail(mail, mail.isTrash)" class="mail-trash"><i class="fa-solid fa-trash "></i></div>
            </div>
            </div>
            <transition name="fade" enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOutUp animate__faster">
            <mail-summery :mail="mail" v-if="summeryOpen" :summeryOpen="summeryOpen"></mail-summery>
            </transition>

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

    },
    methods: {
        trashMail(mail, isTrash) {
            isTrash ? eventBus.emit('removed', mail) : eventBus.emit('trashed', mail)
        },
        markRead(mail, isRead) {
            eventBus.emit('read', { mail: mail, state: isRead })
            if (isRead) eventBus.emit('show-msg', 'Marked as read')
            else eventBus.emit('show-msg', 'Marked as unread')
        },
        archiveMail(mail, isArchived) {
            eventBus.emit('archived', { mail: mail, state: isArchived })
        },
        starMail(mail, isStar) {
            eventBus.emit('starred', { mail: mail, state: isStar })
        },
        toggleSummery() {
            this.summeryOpen = !this.summeryOpen
            if (this.mail.isRead) return
            this.mail.isRead = true
            this.markRead(this.mail, this.mail.isRead)
        },
        openFull() {
            if (!this.mail.isRead)
                this.markRead(this.mail, !this.mail.isRead)
            this.$router.push(`/email/${this.mail.id}`)
        },

    },
    computed: {
        formatDate() {
            return moment(this.mail.sentAt).format('MMM DD')
        },
        formatName() {
            return this.mail.isSent ? 'to: ' + this.mail.toName : this.mail.fromName
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