export default {
    props: ['note'],
    template: `
        <section class="note-todo">
            {{note.title}}
            <div v-for="item in note.info.items" class="flex" >
            <p class="neat-p" :class="{done:item.isDone}">{{item.txt}}</p>
            <button type="button" class="check-btn" :class="{donebtn:item.isDone}" @click="checkTodoDone(item)"></button>
            </div>
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {
        checkTodoDone(item) {
            item.isDone = !item.isDone
        }
    },
    computed: {}
}