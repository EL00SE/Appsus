import { eventBus } from '../services/eventBus-service.js'

export default {
    template: `
      <transition name="fade" enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__animated animate__fadeOutDown">
        <section v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg}}</p>
        </section>
    </transition>
    `,
    data() {
        return {
            msg: null
        };
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 1750)
        }
    },
    unmounted() {
        this.unsubscribe();
    }
};