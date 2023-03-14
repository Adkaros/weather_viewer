import { useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 95%;
    height: 90px;
    margin: auto;

    color: black;

    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
`;

const InnerLayout = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 0px 30px 0px 30px;
`;

const Text = styled.div`
    font-size: 16px;
`;

const MinMaxContainer = styled.div`
    display: flex;
    align-items: center;
`;

const VerticalArrow = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 4px;
`;

export default function DayFragment({ data }) {

    return (
        <Container>
            <InnerLayout>
                <Text style={{ fontWeight: "bold" }}> {data.day} </Text>
                <img src={`https://openweathermap.org/img/w/${data.icon}.png`} style={{ width: "64px", height: '64px' }} />

                <MinMaxContainer>
                    <Text> {data.temp_low} </Text>
                    <VerticalArrow src={"/img/vertical-arrow.png"} style={{ transform: "scaleY(-1)" }} />
                </MinMaxContainer>

                <MinMaxContainer>
                    <Text> {data.temp_high} </Text>
                    <VerticalArrow src={"/img/vertical-arrow.png"} />
                </MinMaxContainer>
            </InnerLayout>
        </Container>
    )
}