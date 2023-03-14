import { useEffect } from 'react';
import styled from "styled-components";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import './global.css';

import CitySearchView from './CitySearchView/CitySearchView';
import WeatherInfoView from './WeatherInfoView/WeatherInfoView';

const Container = styled.div`
  width: 50%;
  height: auto;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
}
`;

function App() {
  
  let location = useLocation();
	const routes = [
		{
			path: "/",
			element: <CitySearchView />
		},
		{
			path: "info/:slug",
			element: <WeatherInfoView />,
		},
	]

  return (
    <div className="App">

        <Routes location={location} key={location.pathname}>
          {
            routes.map((route, i) => { 
              return <Route key={route.path} path={route.path} element={
                <Container>
                  { route.element }
                </Container>
              } />
            })
          }
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </div>
  );
}

export default App;
