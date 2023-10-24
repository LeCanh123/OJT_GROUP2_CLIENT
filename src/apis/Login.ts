import axios from 'axios';

export default {
  loginWithFacebook:async (data:any)=> {
    return await axios.post(import.meta.env.VITE_SERVER_HOST+`users/facebooklogin`,{data})
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
  
  loginWithGoogle:async (data:any)=> {
    return await axios.post(import.meta.env.VITE_SERVER_HOST+`users/googlelogin`,{data})
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

  }