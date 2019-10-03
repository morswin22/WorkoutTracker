import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import cross_gray from '../../assets/cross_gray.png';

const FadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Fade = styled.div`
    z-index: 998;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: rgba(0, 0, 0, 0.5);

    animation: ${FadeIn} 200ms ease-in-out 0s forwards;
`;

const ShowUp = keyframes`
    0% {
        transform: translate(-50%, 10%);
    }
    70% {
        transform: translate(-50%, -60%);
    }
    100% {
        transform: translate(-50%, -50%);
    }
`

const PopupBody = styled.div`
    z-index: 999;
    width: 300px;
    min-height: 20px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    background: #FFFFFF;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.75);

    animation: ${ShowUp} 400ms ease 0ms forwards;
`;

const PopupTitle = styled.div`
    position: relative;
    height: 75px;
    line-height: 75px;
    font-size: 20px;
    text-align: center;
`;

const CloseButton = styled.img`
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
`;

class Popup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <>
            <Fade onClick={this.props.closeHandler} />
            <PopupBody>
                <PopupTitle>
                    {this.props.title}
                    <CloseButton 
                        src={cross_gray} 
                        alt='x' 
                        onClick={this.props.closeHandler} 
                    />
                </PopupTitle>
                {this.props.children}
            </PopupBody>
        </>
        )
    }
}

export default Popup;