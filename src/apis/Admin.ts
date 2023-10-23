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
};
