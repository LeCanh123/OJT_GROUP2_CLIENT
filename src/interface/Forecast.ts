import { CategoryType } from "./Category";

export interface ForecastType {
    id?: string;
    name: string;
    lat: string;
    lng: string;
    level: string;
    place: string;
    size: number;
    time_start: Date;
    created_at?: string;
    updated_at?: string;
    time_notification?: Date;
    block: boolean;
    categorys: CategoryType;
}
