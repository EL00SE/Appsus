
export default {
    template: `
        <header class="app-header">
            <div ref="hero" class="header">
            <nav class="nav-bar">
                    <router-link to="/">Home</router-link> |
                    <router-link to="/email">Mail</router-link> |
                    <router-link to="/Note">Note</router-link> |
                    <a href="https://amitmi1.github.io/MissBook/#/">Book</a>
                </nav>
                <div class="sides">
               
            <div class="info">
            <h1 title="Home" @click="$router.push('/')">APP SUS</h1>
            <div class="meta">Home for apps</div>
            </div>
            </div>
            </div>
        </header>
    
    `,

}