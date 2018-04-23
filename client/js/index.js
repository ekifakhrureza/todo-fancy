Vue.use(VeeValidate);
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'token': localStorage.getItem('token') }
})

new Vue({
    el: '#app',
    data: function () {
        return {
            token: '',
            name: '',
            upcomingTodos: [],
            overdueTodos: [],
            task: '',
            datetask: '',

        }
    },
    methods: {
        onSubmit() {
            this.$validator.validateAll().then(() => {
                console.log('form is valid', this.model)
            }).catch(() => {
                console.log('errors exist', this.errors)
            });
        },

        remove(id, task) {
            let confirmation = confirm(`Are you sure delete task "${task}"?`)
            if (confirmation) {
                instance.delete(`/todos/delete/${id}`, {

                })
                    .then((response) => {
                        if (response.data.data.status === true) {
                            let todoList = this.overdueTodos.filter(list =>
                                list._id != `${id}`
                            )
                            this.overdueTodos = todoList

                        }
                        else {
                            let todoList = this.upcomingTodos.filter(list =>
                                list._id != `${id}`
                            )
                            this.upcomingTodos = todoList
                        }

                    })
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            window.location.href = 'login.html'
        },
    },

    created() {

        if (localStorage.getItem('token') === null) {
            window.location.href = 'login.html';
        } else {
            this.token = localStorage.getItem('token');
            instance.get('/todos/upcoming', {
                headers: { token: this.token }
            })
                .then((response) => {

                    response.data.data.forEach(element => {
                        this.upcomingTodos.push(element);
                    });
                    this.name = localStorage.getItem('name');
                })
                .catch(err => {

                    console.log(err)
                })
            instance.get('/todos/overdue', {
                headers: { token: this.token }
            })
                .then((response) => {
                    response.data.data.forEach(element => {
                        this.overdueTodos.push(element)
                    })
                })
                .catch(err => {
                    console.log(err);

                })
        }
    }
})
