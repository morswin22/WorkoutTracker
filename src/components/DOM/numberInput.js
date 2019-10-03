import React, {Component} from 'react';
import styled from 'styled-components';

import minus_gray from '../../assets/minus_gray.png';
import plus_gray from '../../assets/plus_gray.png';

// eslint-disable-next-line
function ns(n, dec) {
	const p = n.toString().split('.');
	return Number((p[1] && dec > 0) ? p[0] + "." + p[1].substring(0,dec) : p[0]);
}

function na(n, op) {
    const p = n.toString().split('.');
    const a = (Number(p[0])+op);
	return Number((p[1]) ? a + "." + p[1] : a);
}

const StyledInput = styled.div`
    display: flex;

    width: 260px;
    height: 40px;
    margin: 0 auto 18px;

    box-sizing: border-box;
    border: 2px solid #DDDDDD;

    button {
        width: 65px;
        height: 100%;
        background: #DDDDDD;
        border: none;
        cursor: pointer;

        background-repeat: no-repeat;
        background-position: center center;

        &:nth-of-type(1) {
            background-image: url(${props => props.minus});
        }
        &:nth-of-type(2) {
            background-image: url(${props => props.plus});
        }
    }

    div {
        color: #5B5B5B;
        font-weight: bold;
        line-height: 35px;
        text-align: center;
        cursor: text;

        width: 130px;

        &.focused {
            outline: 1px dotted #212121;
            outline: 5px auto -webkit-focus-ring-color;
        }

        input[type="number"] {
            color: #5B5B5B;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            outline: none;
            border: none;
            &::-webkit-inner-spin-button, 
            &::-webkit-outer-spin-button { 
                -webkit-appearance: none; 
                margin: 0; 
            }
        }

        & > span {
            opacity: 1;
            position: initial;
            z-index: initial;
            font-size: 13px;
        }
    }

    span {
        opacity: 0;
        position: absolute;
        z-index: -1;
        font-size: 18px;
    }
`;

class NumberInput extends Component {
    constructor(props) {
        super(props);
        
        this.widthProvider = React.createRef();
        this.input = React.createRef();
        
        this.min = Number(this.props.min || -Infinity);
        this.max = Number(this.props.max || Infinity);
        this.fixedDecimals = Number(this.props.fixedDecimals || 2);

        this.minInputWidth = 15;

        this.state = {
            value: 0,
            focused: false
        };
    }
    
    decrese = () => {
        this.setState((prevState, props) => {
            const value = na(prevState.value, -1);
            return { value: this.formatValue(value) }
        });
    }

    increse = () => {
        this.setState((prevState, props) => {
            const value = na(prevState.value, +1);
            return { value: this.formatValue(value) }
        });
    }

    updateWidth = (event) => {
        const value = Number(event.target.value);
        this.setState({ value });
    }
    
    updateInput = (event) => {
        const value = Number(event.target.value);
        this.setState({ value: this.formatValue(value) });
    }

    formatValue = (value) => {
        value = (value >= this.min) ? value : this.state.value;
        value = (value <= this.max) ? value : this.state.value;
        // value = ns(value, this.fixedDecimals);
        if (this.props.fallback) this.props.fallback(value);
        return value;
    }
    
    focusInput = () => {
        this.input.current.focus();
        this.setState({ focused: true });
    }

    blurHandle = () => {
        this.setState({ focused: false });
    }

    getWidth = () => {
        return ((this.widthProvider.current) ? (this.widthProvider.current.clientWidth > this.minInputWidth) ? this.widthProvider.current.clientWidth + 7 : this.minInputWidth : this.minInputWidth) + 'px';
    }
  
    render() {
        return (
            <StyledInput minus={minus_gray} plus={plus_gray}>
                <span ref={this.widthProvider} onChange={console.log}>{this.state.value}</span>
                <button onClick={this.decrese}></button>
                <div 
                    className={(this.state.focused) ? 'focused' : ''}
                    onClick={this.focusInput}
                >
                    <input 
                        value={this.state.value === 0 ? "": this.state.value}
                        type="number"
                        ref={this.input}
                        onChange={this.updateInput}
                        onKeyUp={this.updateWidth}
                        onBlur={this.blurHandle}
                        min={this.min}
                        max={this.max}
                        placeholder="0"
                        style={{width: this.getWidth()}}
                    />
                    {(this.props.unit) ? (
                        <span>{this.props.unit}</span>
                    ) : null}
                </div>
                <button onClick={this.increse}></button>
            </StyledInput>
        );
    }
}

export default NumberInput;