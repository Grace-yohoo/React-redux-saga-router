import{fetchb,fetchc,addkey,localhost} from './requesttype'


//Model 页面
export const model = {

    //fetch渲染数据
    fetch1:function* (){

      const response = yield fetchb(localhost)  

      const data2 = yield addkey(response) 
      
      return data2 
    },
    //删除 添加 修改
    change:function* (fedata,data1){
    
      yield fetchc(localhost+fedata,data1)

      const response = yield fetchb(localhost)

      const data2 = yield addkey(response) 

      return data2
    
    },
    //搜索
    datamql3 :function* (val){
      const data1 = yield val.data
    
      const fedata = yield val.data2
    
      const response = yield fetchc(localhost+fedata,data1)
    
      const data2 = yield addkey(response)
    
      return data2
    }
}
