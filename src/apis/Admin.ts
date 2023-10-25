import axios from "axios";
import { ForecastType } from "../interface/Forecast";

export default {
    /* Category */
    addCategory: async (data: any) => {
        return await axios.post(
            import.meta.env.VITE_SERVER_HOST + `categorys`,
            data
        );
    },
    updateCategory: async (id: string, data: any) => {
        return await axios.patch(
            import.meta.env.VITE_SERVER_HOST + `categorys/` + id,
            data
        );
    },
    getCategory: async () => {
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `categorys`);
    },
    paginationCategory:async (page:number,limit:number)=>{
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}categorys?page=${page}&limit=${limit}`)
    },
    searchCategory:async(search:string)=>{
        return await axios.get(import.meta.env.VITE_SERVER_HOST+"categorys?q="+search)
    },
    /* Forecast */
    addForecast: async (data: ForecastType) => {
        return await axios.post(
            import.meta.env.VITE_SERVER_HOST + `earthquakes`,
            data
        );
    },
    updateForecast: async (id: string, data: ForecastType) => {
        return await axios.patch(
            import.meta.env.VITE_SERVER_HOST + `earthquakes/` + id,
            data
        );
    },
    getForecastById: async (id: string) => {
        return await axios.get(
            import.meta.env.VITE_SERVER_HOST + `earthquakes/` + id
        );
    },
    getForecast: async () => {
        return await axios.get(
            import.meta.env.VITE_SERVER_HOST + `earthquakes`
        );
    },
    paginationForecast:async (page:number,limit:number)=>{
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}earthquakes?page=${page}&limit=${limit}`)
    },

    getMessage: async (page: number, limit: number) => {
        try {
            const url = `${
                import.meta.env.VITE_SERVER_HOST
            }message?page=${page}&limit=${limit}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log("getMessage error:", error);
            throw error;
        }
    },
    delete: async (id: number) => {
        return await axios.delete(
            import.meta.env.VITE_SERVER_HOST + "message/" + id
        );
    },
    search: async (search: string) => {
        return await axios.get(
            import.meta.env.VITE_SERVER_HOST + "message?q=" + search
        );
    },

    /* Mail */
    sendMail: async () => {
        return await axios.post(
            import.meta.env.VITE_SERVER_HOST + "earthquakes/mail"
        );
    },

    //chart
    AdminGetChart:async (data:any)=>{
        return await axios.post(import.meta.env.VITE_SERVER_HOST+`earthquakes/getchart`,{...data})
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
};
