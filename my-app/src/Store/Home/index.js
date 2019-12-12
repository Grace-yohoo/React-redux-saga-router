import {observable, action,  computed, runInAction} from "mobx";


export default class HomeStore {

    @observable data = null;
    @observable dataSearch = null;
    @observable editingKey= '';
    @observable visible= false;
    @observable searchText = '';
    @observable searchvalue =""
    @observable loading = false;

    @computed get aaa(){
        return this.age * this.price
    }

    @action click=() => {
        this.name ='test';
        this.age = 500;
    }

    //获取数据 转为一维数组
    @action.bound changeData(result){
        console.log(this);
        console.log(result)
        let arr = []
        let data2 = []
        const data1 = result.results
        console.log(data1)
      
  
        for(let k in data1){
            arr.push(data1[k])
        }
        let arr2 = [].concat.apply([], arr);
        console.log(arr2)
      
        for (let i = 0; i < arr2.length; i++) {
            data2.push({
                publishedAt:arr2[i].publishedAt,
                type:arr2[i].type,
                url:arr2[i].url,	
                who:arr2[i].who,
                key: arr2[i]._id,
                createdAt:arr2[i].createdAt,
                desc:arr2[i].desc,
                source:arr2[i].source,
  
  
                used:true,
            });
        }
            this.data = data2

            this.dataSearch= data2

    }

    @action handleDelete = key => {
        this.loading=true;
        const data= [...this.data];
        this.data =  data.filter(item => item.key !== key) 
        setTimeout(() => {
          runInAction(()=>{
            this.loading=false;  
          }) 
        }, 500);
    };

    @action isEditing = (record) => record.key === this.editingKey;

    @action save = (form, key) => {
        form.validateFields((error, row) => {
          if (error) {
            return;
          }
          const newData = [...this.data];
          const index = newData.findIndex(item => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            this.loading=true;
            this.data=newData
            this.editingKey='' 
            setTimeout(() => {
              runInAction(()=>{
                this.loading=false;  
              }) 
            }, 500);
            

          } else {
            newData.push(row);
            this.data = newData
            this.editingKey = '' 
          }
        });
    }

    @action cancel = () => {
        this.editingKey ='' 
        this.loading=true;
        setTimeout(() => {
          runInAction(()=>{
            this.loading=false;  
          }) 
        }, 500);

    };

    @action edit=(key)=>{
        this.editingKey = key

    }

    @action  saveFormRef = formRef => {
        this.formRef = formRef;
      };

    @action  showModal = () => {
        this.visible= true
      };

    @action  handleCancel = () => {

        this.visible=false

      };
       
    @action handleCreate = () => {
        const data = this.data;
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          let time = new Date();
          let time2 = (new Date().valueOf())
          function formatDate(now) { 
            var year=now.getFullYear(); 
            var month=now.getMonth()+1; 
            var date=now.getDate(); 
            var hour=now.getHours(); 
            var minute=now.getMinutes(); 
            var second=now.getSeconds(); 
            return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
         } 
          var d =(formatDate(time))
          values.key = time2
          values.createdAt = d
          console.log('Received values of form: ', values);
          data.push(values)
          this.loading=true;
          this.data=data
          form.resetFields();
          this.visible= false 
          setTimeout(() => {
            runInAction(()=>{
              this.loading=false;  
            }) 
          }, 500);
        });
      };

    @action.bound  onSearch(value){
        this.searchText= value
        const searchText  = this.searchText
        console.log(searchText)
      }
       //还原筛选前的数据
    @action.bound handleReset(){
      this.loading=true; 
        const dataSearch = this.dataSearch
        this.data=dataSearch
        setTimeout(() => {
          runInAction(()=>{
            this.loading=false;  
          }) 
        }, 500);
    }
  //筛选数据

    @action.bound handleSearch(values){
        console.log(values);
        let arr6 = []
        const data = this.data
        for (let k in data){
        if (data[k].who.search(values)>=0){
            arr6.push({
            createdAt: data[k].createdAt,
            desc: data[k].desc,
            key: data[k].key,
            publishedAt: data[k].publishedAt,
            source: data[k].source,
            type: data[k].type,
            url: data[k].url,
            who: data[k].who,
            })
        }
        }
        this.loading=true;
        this.data=arr6
        setTimeout(() => {
          runInAction(()=>{
            this.loading=false;  
          }) 
        }, 500);

        
    };

    @action handleSearchIn= (value) =>{
        this.handleSearch(value)
     }
      
    @action.bound handleChange(e){
        this.searchvalue=e.target.value

      }
    @action.bound handleResetson(){
       this.handleReset()
        this.searchvalue=""
      }
}
