import axios from 'axios';

export default {
  getAllMap:async ()=> {
      return await axios.get(import.meta.env.VITE_SERVER_HOST+`maps`)
        .then(res => {
          console.log("ress",res);
          return res
        })
        .catch(error => {
          console.log("errr",error);
          
          return {data: {
            status:false,
            message:"Lỗi hệ thống"
          }}
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

  }  
  }