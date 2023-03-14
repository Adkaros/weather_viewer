import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import CitySearchOption from './CitySearchOption';

const Layout = styled.div`
    width: auto;
    height: 100%;
    margin: 12px;
`;

const Header = styled.h1`
    margin: 12px;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
`;

const Input = styled.input`
    font-size: 18px;
    padding: 10px;
    background: #FEFEFE;
    border: none;
    border-radius: 3px;
    flex-grow: 2;
    align-self: center;

    ::placeholder {
        color: #9c9c9c;
    }
`;

const Button = styled.button`
    background: ${props => props.primary ? "#1565c0" : "white"};
    color: ${props => props.primary ? "white" : "#1565c0"};

    font-size: 1em;
    margin: 0px 0px 0px 10px;
    padding: 10px;
    border: 0px solid black;
    border-radius: 3px;
    cursor: pointer;
`;

const SearchContainer = styled.div`
    width: 100%;
    height: auto;

    display: flex;
`

export default function CitySearchView({ }) {
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef();

    const queryCities = (e) => {
        if (e.key && e.key !== 'Enter') return;
        if (inputRef.current.value === "") return;

        let apiKey = "a90119abaea2479fa95058aea4d1de1a";
        let resultLimit = 3;
        let geoEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${inputRef.current.value}&limit=${resultLimit}&appid=${apiKey}`;

        fetch(geoEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
            });
    }

    useEffect(() => {
        let initialResults = [{
            "name": "Chicago",
            "lat": 41.8755616,
            "lon": -87.6244212,
            "country": "US",
            "state": "Illinois"
        }, {
            "name": "Los Angeles",
            "lat": 34.0536909,
            "lon": -118.242766,
            "country": "US",
            "state": "California"
        }, {
            "name": "Berlin",
            "lat": 52.5170365,
            "lon": 13.3888599,
            "country": "DE"
        }];

        setSearchResults(initialResults);
    }, [])

    return (
        <Layout>
            <div id="top" style={{ marginTop: "32px" }}>
                <Header>Weather</Header>
                <SearchContainer>
                    <Input ref={inputRef} type="text" placeholder="Search for a city" onKeyDown={queryCities} />
                    <Button primary onClick={queryCities}>Search</Button>
                </SearchContainer>
            </div>

            <div id="bottom">
                <div id="search-results">
                    {searchResults.map((result, i) => {
                        return <CitySearchOption key={result.name + "-" + result.state}
                            name={result.name} country={result.country} state={result.state} coords={{ lat: result.lat, lon: result.lon }} />
                    })}
                </div>
            </div>
        </Layout>
    )
}