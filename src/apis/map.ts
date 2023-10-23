import axios from 'axios';

export default {
  getAllMap:async ()=> {
    return await axios.get(import.meta.env.VITE_SERVER_HOST+`earthquakes/user/get`)
      .then(res => {
        if(res.data){
          return res.data
        }
        console.log("ress",res);
        
      })
      .catch(error => {
        console.log("errr",error);
        
        return {
          status:false,
          message:"Lỗi hệ thống"
              }
      }
      );
  },

    getAllCategory:async ()=> {
      return await axios.get(import.meta.env.VITE_SERVER_HOST+`categorys/user/get`)
        .then(res => {
          if(res.data){
            return res.data
          }
          console.log("ress",res);
          
        })
        .catch(error => {
          console.log("errr",error);
          
          return {
            status:false,
            message:"Lỗi hệ thống"
                }
        }
        );
    },
  
    getCategoryById:async (data:any)=> {
      return await axios.post(import.meta.env.VITE_SERVER_HOST+`earthquakes/user/getbyid`,{...data}) //categoryId
        .then(res => {
          if(res.data){
            return res.data
          }
          console.log("ress",res);
          
        })
        .catch(error => {
          console.log("errr",error);
          
          return {
            status:false,
            message:"Lỗi hệ thống"
                }
        }
        );
    },
  
    UserChangeTimeNotification:async (data:any)=>{
        
      return await axios.post(import.meta.env.VITE_SERVER_HOST+`users/changetime`,{data})
      .then(res => {
        console.log("ress",res);
        return res
      })
      .catch(error => {
        console.log("errr",error);
        
        return {data: 
          {
            status:false,
            message:"Lỗi hệ thống"
          }
        }
      }
      );
  
    },
    
    UserGetNotification:async (data:any)=>{
      return await axios.post(import.meta.env.VITE_SERVER_HOST+`earthquakes/user/getnotification`,{...data})
      .then(res => {
        if(res.data){
          return res.data
        }
        console.log("ress",res);
        
      })
      .catch(error => {
        console.log("errr",error);
        
        return {
          status:false,
          message:"Lỗi hệ thống"
              }
      }
      );
    } 
  }