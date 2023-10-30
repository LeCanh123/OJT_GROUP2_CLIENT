import axios from "axios";

export default {
  adminLogin: async (data: any) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + `admin`, { ...data })
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        console.log("ress", res);
      })
      .catch((error) => {
        console.log("errr", error);

        return {
          status: false,
          message: "Lỗi hệ thống",
        };
      });
  },
  adminCheckLogintoken: async (data: any) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + `admin/checktoken`, { ...data })
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        console.log("ress", res);
      })
      .catch((error) => {
        console.log("errr", error);

        return {
          status: false,
          message: "Lỗi hệ thống",
        };
      });
  },
  adminRegister: async () => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + `admin/register`, { data: "0" })
      .then((res) => {
        if (res.data) {
          // return res.data
        }
        // console.log("ress",res);
      })
      .catch((error) => {
        // console.log("errr",error);

        return {
          status: false,
          message: "Lỗi hệ thống",
        };
      });
  },

  getAllUser: async () => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + `users1/getusers`)
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        // console.log("ress",res);
      })
      .catch((error) => {
        // console.log("errr",error);

        return {
          status: false,
          message: "Lỗi hệ thống",
        };
      });
  },
};
