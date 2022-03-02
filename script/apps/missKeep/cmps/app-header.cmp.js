export default {
    template:`
        <header class="app-header">
            <div class="logo">
                <h3>Cars</h3>
            </div>
            <nav class="nav-bar">
                <router-link to="/">Home</router-link> |
                <router-link to="/car">Cars</router-link> |
                <router-link to="/about">About</router-link>
                
            </nav>
        </header>
    
    `
}