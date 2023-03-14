import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DayFragment from './DayFragment';

const Layout = styled.div`
    position: relative;
    width: auto;
    height: 100%;
    margin: 12px;
    text-align: center;
`;

const BackButton = styled.img`
    position: absolute;
    top: 1px;
    left: 12px;
    width: 32px;

    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: translateX(-5px);
    }
`;

const CityHeader = styled.div`
    font-size: 36px;
`;

const MainTempHeader = styled.div`
    font-size: 96px;
    margin-top: -6px;
    margin-left: 28px;
`;

export default function WeatherInfoView({ }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [cityData, setCityData] = useState(null);
    const [forecastSamples, setForecastSamples] = useState([]);

    useEffect(() => {
        if (forecastSamples?.length > 0) return;

        const apiKey = "a90119abaea2479fa95058aea4d1de1a";
        const lat = slug.split(',')[0];
        const lon = slug.split(',')[1];

        let weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        // fetch weather data
        fetch(weatherEndpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log("weather data", data)

                let sanitizedData = {
                    name: data.name,
                    country: data.sys.country,
                    temp: kelvinToFahrenheit(data.main.temp),
                    temp_high: kelvinToFahrenheit(data.main.temp_max),
                    temp_low: kelvinToFahrenheit(data.main.temp_min),
                    condition: data.weather[0].main,
                    icon: data.weather[0].icon
                }

                // set general city data
                setCityData(sanitizedData);
            });


        let forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        // fetch 5 day forecast
        fetch(forecastEndpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log("forecast data", data)

                let samples = data.list;
                const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                // filter down to just 5 days at UTC hour 9
                samples.forEach(s => {
                    let d = new Date(s.dt * 1000);

                    if (d.getUTCHours() === 9) {

                        let sanitizedData = {
                            dt: s.dt,
                            day: weekday[new Date(s.dt * 1000).getUTCDay()],
                            temp_high: kelvinToFahrenheit(s.main.temp_max),
                            temp_low: kelvinToFahrenheit(s.main.temp_min),
                            condition: s.weather[0].main,
                            icon: s.weather[0].icon
                        }

                        setForecastSamples(a => [...a, sanitizedData])
                    }
                })
            });
    }, [])

    return (
        <Layout>
            <div className="top">
                {cityData &&
                    <>
                        <CityHeader>
                            <BackButton src="/img/back-arrow.png" onClick={() => navigate("/")} />
                            {cityData.name}
                        </CityHeader>
                        <MainTempHeader>{cityData.temp}°</MainTempHeader>
                        <div>{cityData.condition}</div>
                        <div>
                            <p style={{marginTop: "8px"}}>H:{cityData.temp_high}° L:{cityData.temp_low}°</p>
                        </div>
                        <img src={`https://openweathermap.org/img/w/${cityData.icon}.png`} style={{ width: "64px" }} />
                    </>
                }
            </div>

            <div className="bottom">
                <h1 style={{fontWeight: "normal"}}>5 day forecast</h1>
                <div id="search-results" style={{ minHeight: "400px", display: "flex", flexDirection: "column", gap: "10px" }}>

                    {
                        forecastSamples.map((sample, i) => {
                            return <DayFragment key={sample.dt} data={sample} />
                        })
                    }
                </div>
            </div>
        </ Layout>
    )
}

function kelvinToFahrenheit(kelvin) {
    return Math.round(((kelvin-273.15)*1.8)+32);
}