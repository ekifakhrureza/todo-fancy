Vue.component('create-todo-component', {
    template: `
    <div class="columns is-desktop">
   
    <div class="column">
        <div class="control">
            <label class="label">Task</label>
            <input v-model="task" v-validate="'required'" class="input" type="text" placeholder="Input Your Task Here" name="task" v-bind:class="{'form-control': true, 'error': errors.has('task') }">

        </div>
       
    </div>
    <div class="column">
        <div class="control">
            <label class="label">Schedule</label>
            <input v-model="datetask" v-validate="'required'" class="input" type="date" placeholder="Click To Show Calendar" name="datetask"
                v-bind:class="{'form-control': true, 'error': errors.has('task') }">
        </div>
        
    </div>
    <div class="column">
        <BR />
        <div class="control">
            <button class="button is-link" @click="add()">Add</button>
        </div>
    </div>

</div>
`,
    props : ['overduetodos','upcomingtodos'],
    data: function () {
        return {
            task: '',
            datetask: '',
        }
    },

    methods : {
        add() {
            let task = this.task
            let datetask = this.datetask
            instance.post('/todos/add', {
                task: task,
                datetask: datetask
            }).then((response) => {
                if(response.data.data.status===true)
                {
                    this.task=""
                    this.datetask=""
                    this.overduetodos.push(response.data.data)
                  
                }
                else{
                    this.task=""
                    this.datetask=""
                    this.upcomingtodos.push(response.data.data)
                    
                }
                
            })
        }
    }
   
})