import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100px;
    cursor: pointer;
    color: black;
    margin-top: 10px;

    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    transition: transform 0.3s;

    &:hover {
        transform: translateX(25px);
    }
`;

const Header = styled.div`
    font-weight: bold;
    font-size: 18px;
`;

const Description = styled.div`
    font-size: 18px;
`;

const CardLayout = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
`;

export default function CitySearchOption({ name, country, state, coords }) {
    return (
        <Link to={"/info/" + (coords.lat + "," + coords.lon)} style={{ textDecoration: 'none' }}>
            <Container>
                <CardLayout>
                    <Header> {name}</Header>
                    <Header style={{fontWeight: "normal"}}>, {state} ({country})</Header>
                </CardLayout>
            </Container>
        </Link>
    )
}