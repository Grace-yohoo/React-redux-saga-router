import {observable, action,  computed, runInAction} from "mobx";
import request from '../../Request/request';
// global.fetch = require('node-fetch');


export default class HomeStore {

    @observable data = null;
    @observable editingKey= '';
    @observable visible= false;
    @observable searchText = '';
    @observable searchvalue =""
    @observable loading = false;
    @observable mysqldata = null;

    @computed get aaa(){
        return this.age * this.price
    }

    @action click=() => {
        this.name ='test';
        this.age = 500;
    }

    //获取数据 转为一维数组
    @action.bound changeData(result){
      
        for (let k in result){
          result[k].key = result[k].createdAt
        }
        this.data = result     

    }
    
    @action.bound change(result){
            
      for (let k in result){
        result[k].key = result[k].createdAt
      }
      this.data = result

    }

    @action handleDelete = key => {
        this.loading=true;
        request.mysqldelete(key,this.change)
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
            row.key = key

            this.editingKey='' 
            setTimeout(() => {
              request.mysqlchange(row,this.change)
              runInAction(()=>{
                this.loading=false;  
              }) 
            }, 1000);
            

          } else {
            newData.push(row);
            console.log(row)
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
        this.loading = true
        form.resetFields();
        this.visible= false 
        setTimeout(() => {
          request.mysqladd(values,this.change)
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
      request.mysqlreset(this.change)

        setTimeout(() => {
          runInAction(()=>{
            this.loading=false;  
          }) 
        }, 500);
    }
  //筛选数据

    @action.bound handleSearch(values){
        console.log(values);
            request.mysqlsearch(values,this.change)

        this.loading=true;
        // this.data=arr6
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
