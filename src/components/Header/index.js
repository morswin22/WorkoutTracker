import React from 'react';
import styled from 'styled-components';

import Navigation from '../Navigation';

import LogoImg from '../../assets/Logo.png';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 70px;
    margin-bottom: 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

    position: relative;
`;

const Logo = styled.img`
    width: 48px;
    height: 48px;

    position: absolute;
    top: 11px;
    left: 15px;
`;

const Text = styled.span`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;

    letter-spacing: 0.06em;

    color: ${props => props.color}
`;

const Blue = '#0063AB';
const Black = '#000000';

const Header = () => (
    <Container>
        <Logo 
            src={LogoImg}
        />
        <Text color={Blue}>Work</Text>
        <Text color={Black}>out</Text>
        &nbsp;
        <Text color={Blue}>Track</Text>
        <Text color={Black}>er</Text>
    </Container>
);

export default Header;