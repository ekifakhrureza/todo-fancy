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
            todos: [],
            task: '',
            datetask: ''
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
        add() {
            let task = this.task
            let datetask = this.datetask
            instance.post('/todos/add', {
                task: task,
                datetask: datetask
            }).then((response) => {
                window.location.href = 'index.html';
            })
        },
       
        remove(id, task) {
            console.log(id);
            
            var answer = confirm(`Are you sure delete task "${task}"?`)
            if (answer) {
                instance.delete(`/todos/delete/${id}`, {})
                    .then((response) => {
                        window.location.href = 'index.html';
                    })
            }
        },
       
    },

    created () {
        if (localStorage.getItem('token') === null) {
            window.location.href = 'login.html';
        } else {
            this.token = localStorage.getItem('token');
            axios.get('http://localhost:3000/todos', {
                headers: { token: this.token }
            })
                .then((response) => {


                    response.data.data.forEach(element => {
                        this.todos.push(element);
                    });
                    this.name = localStorage.getItem('name');


                })
                .catch(err => {
                    console.log('malih malih');

                    console.log(err)
                })
        }
    }
})
