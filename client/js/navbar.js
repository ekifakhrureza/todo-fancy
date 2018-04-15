Vue.component('navbar-component', {
    template:`
    <nav class="navbar is-transparent">
    <div class="navbar-brand">
        <a class="navbar-item">
            Home
        </a>
        <div id="navbar-burger-id" class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">

            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" href="/documentation/overview/start/">
                    Docs
                </a>
                <div class="navbar-dropdown is-boxed">
                    <a class="navbar-item" href="/documentation/overview/start/">
                        Overview
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                        Modifiers
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                        Columns
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                        Layout
                    </a>
                    <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                        Form
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                        Elements
                    </a>
                    <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                        Components
                    </a>
                </div>
            </div>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="field is-grouped">
                    <p class="control">
                       Welcome {{name}}
                    </p>

                    <p class="control">
                       
                     
                            <a class="button is-success is-rounded" @click="logout()">Log Out</a>
                       
                    </p>
                </div>
            </div>
        </div>
    </div>
</nav>`,
    props: ['token', 'name'],
    data: function () {
        return {}
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            window.location.href = 'login.html'
        }
    },
})
