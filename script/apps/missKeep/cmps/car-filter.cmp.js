export default {
    template: `
        <section class="car-filter">
            <label>
                Search
                <input ref="vendorInput" 
                    @input="setFilter" 
                    type="text" 
                    v-model="filterBy.vendor" 
                    placeholder="By vendor"
                />
            </label>
        </section>
    `,
    data() {
        return {
            filterBy: {
                vendor: ''
            }
        };
    },
    mounted() {
        this.$refs.vendorInput.focus()
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy });
        }
    }
}