import React, { useEffect, useState } from 'react';
import EarthquakeMap from './EarthquakeMap';
import Admin from '../../../apis/Admin';
import { ForecastType } from '../../../interface/Forecast';

function Test() {
    // const earthquakes:  = [
    //     { lat: 10, lon: 20, magnitude: 5.5 },
    //     { lat: 15, lon: 25, magnitude: 6.2 },
    //     { lat: 5, lon: 30, magnitude: 7.8 },
    // ];

    const [earthquakes, setEarthquakes] = useState<ForecastType[] | null>([]);
    useEffect(() => {
        Admin.getForecast()
            .then(res => {
                setEarthquakes(res.data.data)
            })
    }, [])

    return (
        <div>
            <h1>Earthquake Map</h1>
            <EarthquakeMap earthquakes={earthquakes} />
        </div>
    );
}

export default Test;