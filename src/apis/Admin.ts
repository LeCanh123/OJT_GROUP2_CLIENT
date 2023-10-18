import axios from "axios";

export default {
    addCategory: async (data: any) => {
        return await axios.post(
            import.meta.env.VITE_SERVER_HOST + `categorys`,
            data
        );
    },
    getCategory: async () => {
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `categorys`);
    },

    updateCategory: async (id: string, data: any) => {
        return await axios.patch(
            import.meta.env.VITE_SERVER_HOST + `categorys/` + id,
            data
        );
    },

    //forecast
    addForeCast: async (data: any) => {
        console.log("dữ liệu gửi lên", data);

        return await axios
            .post(import.meta.env.VITE_SERVER_HOST + `maps/admin/create`, {
                ...data,
            })
            .then((res) => {
                console.log("ress", res);

                return res;
            })
            .catch((error) => {
                console.log("errr", error);

                return {
                    data: {
                        status: false,
                        message: "Lỗi hệ thống",
                    },
                };
            });
    },
};
