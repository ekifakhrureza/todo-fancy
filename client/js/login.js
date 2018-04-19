// Fork: Basic Form Controls
Vue.use(VeeValidate);

new Vue({
  el: '#applogin',
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      checkToken: localStorage.getItem('token'), 
    }
  },
  created() {
    if (localStorage.getItem('token') !== null) {
      window.location.href = 'index.html';
    }
    VeeValidate.Validator.extend('verify_password', {
      getMessage: field => `The password should contain number`,
      validate: value => {
        // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var strongRegex = new RegExp(/\d/);
        return strongRegex.test(value);
      }
    });
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(() => {
        console.log('form is valid', this.model)
      }).catch(() => {
        console.log('errors exist', this.errors)
      });
    },
  
    login(){

      let email = this.email;
      let password = this.password;
      axios.post('http://localhost:3000/users/login', {
        email: email,
        password: password
      })
        .then((data) => {
          
          if (data.status === 202) {
            alert('Wrong email/password')
          }
          else {
            localStorage.setItem('name', data.data.name)
            localStorage.setItem('token', data.data.token)
            localStorage.setItem('username', data.data.email)
            window.location.href = 'index.html';
          }


        })
        .catch(err => {
             alert('Connection problem')
          console.log(err);
        })
    },
    logout() {
      console.log('masuk logout');
      localStorage.setItem('name', data.data.name)
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('username', data.data.email)
      window.location.href = 'login.html'
      this.checkToken = null

    },
    
  },

})