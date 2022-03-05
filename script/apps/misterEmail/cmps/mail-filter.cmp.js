export default {
    template: `
        <section class="mail-filter">
            <label>
                <input ref="searchInput" 
                    @input="setFilter" 
                    type="text" 
                    v-model="searchTerm.searchTerm" 
                    
                />
            </label>
        </section>
    `,
    data() {
        return {
            searchTerm: {
                searchTerm: ''
            },
        }
    },
    mounted() {
        this.$refs.searchInput.focus()
        this.$refs.searchInput.placeholder = 'Search...'
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.searchTerm });

        }
    }
}