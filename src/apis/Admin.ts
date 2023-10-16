import axios from 'axios';

export default {
    AddCategory:async (data:any)=> {
        return await axios.post(import.meta.env.VITE_SERVER_HOST+`categorys/admin/add`,data)
          .then(res => {
            console.log("ress",res);
            
            return res
          })
          .catch(error => {
            console.log("errr",error);
            
                return {data: {
                              status:false,
                              message:"Lỗi hệ thống"
                              }}}
          );

    },
    GetCategory:async (data:any)=> {
    return await axios.post(import.meta.env.VITE_SERVER_HOST+`categorys/admin/get`,{type:data})
        .then(res => {
        console.log("ress",res);
        
        return res
        })
        .catch(error => {
        console.log("errr",error);
        
            return {data: {
                            status:false,
                            message:"Lỗi hệ thống"
                            }}}
        );

    },
    DeleteCategory:async (data:any)=> {
        return await axios.post(import.meta.env.VITE_SERVER_HOST+`categorys/admin/delete`,{id:data})
            .then(res => {
            console.log("ress",res);
            
            return res
            })
            .catch(error => {
            console.log("errr",error);
            
                return {data: {
                                status:false,
                                message:"Lỗi hệ thống"
                                }}}
            );
    
    },


    //forecast
    AddForeCast:async (data:any)=> {
      console.log("dữ liệu gửi lên",data);
      
        return await axios.post(import.meta.env.VITE_SERVER_HOST+`maps/admin/create`,{...data})
          .then(res => {
            console.log("ress",res);
            
            return res
          })
          .catch(error => {
            console.log("errr",error);
            
                return {data: {
                              status:false,
                              message:"Lỗi hệ thống"
                              }}}
          );

    },
      
    }