// Fork: Basic Form Controls
Vue.use(VeeValidate);

new Vue({
  el: '#appreg',
  data: function () {
    return {
      title: 'Sign Up',
      name: '',
      email: '',
      password: '',
      confirmation_password: ''
    }
  },
  created() {
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
    register() {
      let email = this.email
      let name = this.name
      let password = this.password
      axios.post('http://localhost:3000/users/register', {
        email: email,
        name: name,
        password: password

      })
        .then((data) => {
          if(data.status===202){
            console.log('masuk error');
            alert('Email Already Exist') 
         }
         else{
            console.log('masuk gak yaaa?');
            localStorage.setItem('token', data.data.token)
            window.location.href = 'index.html';
         }

        })
        .catch(err => {
          console.log(err);

        })
    },
  },

})