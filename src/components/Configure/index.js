import React, { Component } from 'react';
import { compose } from 'recompose';
import styled, { keyframes } from 'styled-components';

import { 
    // AuthUserContext, 
    withAuthorization, 
    withEmailVerification 
} from '../Session';
import { withFirebase } from '../Firebase';

import { Section, NumberInput, Popup, SignForm } from '../DOM';
import add_excercise from '../../assets/add_excercise.png';
import delete_lap from '../../assets/delete_lap.png';
import settings from '../../assets/settings.png';

const RollDown = keyframes`
    from {
        height: 0px;
    }
    to {
        height: 40px;
    }
`;

const RollUp = keyframes`
    from {
        height: 40px;
    }
    to {
        height: 0px;
        margin-bottom: 0px;
    }
`;

const StyledPage = styled.div`

    .lap {
        width: 100%;

        &:nth-of-type(1) {
            margin-top: 25px;
        }

        &_Name {
            background-color: #DDDDDD;
            height: 40px;
            line-height: 40px;
            padding-left: 15px;
            position: relative;
            margin-bottom: 8px;

            animation: ${RollDown} 200ms ease-out 0ms forwards;
            overflow-y: hidden;

            &[deleted=yes] {
                height: 0px;
                animation: ${RollUp} 200ms ease-out 0ms forwards;
            }

            img {
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                cursor: pointer;

                &:nth-of-type(1) {
                    right: 41px;
                }

                &:nth-of-type(2) {
                    right: 16px;
                }
            }
        }

        .excercise {
            margin-bottom: 8px;
            height: 35px;
            line-height: 35px;
            width: 100%;

            font-size: 15px;

            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: 36px auto 70px;

            img {
                width: 16px;
                height: 16px;
                align-self: center;
                justify-self: center;
                cursor: pointer;
            }

            small {
                font-size: 12px;
            }
        }
    }

    & > div > button {
        display: flex;
        width: 100%;
        height: 25px;
        line-height: 25px;
        justify-content: center;
        border: none;
        background: none;
        font-size: 13px;
        color: #0060D0;
        margin-bottom: 8px;
        outline: none;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`;

// eslint-disable-next-line
const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

const names = ['st', 'nd', 'rd', 'th'];

const toFirstUpper = str => str[0].toUpperCase() + str.slice(1);

class ConfigurePage extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            laps: [],
            currentPopup: null,
            excerciseFormName: '',
            excerciseFormCount: '',
        }
    }

    componentDidMount() {
        this.fetchLaps();
    }

    fetchLaps = () => {
        const fetched = {
            [uuidv4()]: [{n: 'Push ups', c: 10}],
            [uuidv4()]: [{n: 'Dipy', c: 8}],
            [uuidv4()]: [],
        };
        this.setState({ laps: fetched });
    }

    newLap = () => {
        this.setState((prevState, props) => {
            prevState.laps[uuidv4()] = [];
            return { laps: prevState.laps }
        });
    }

    onExcerciseFormChange = event => {
        this.setState({ ["excerciseForm" + toFirstUpper(event.target.name)]: event.target.value });
    }

    newExcercisePopup = () => {
        this.setState({
            currentPopup: 'newExcercise'
        })
    }

    newExcercise = (event) => {
        event.preventDefault();
    }

    deleteLapPopup = (event) => {
        const i = event.target.getAttribute('target');
        if (this.state.laps[i].length === 0) {
            this.deleteLap(i);
        } else {
            const lapName = i >= names.length ? names[names.length-1] : names[i];
            this.setState({
                currentPopup: "deleteLap",
                popupData: {i, lapName}
            })
        }
    }

    deleteLapEvent = (event) => {
        this.deleteLap(event.target.getAttribute('target'));
        this.closePopups();
    }

    deleteLap = (i) => {
        this.setState((prevState, props) => {
            prevState.laps[i] = [];
            prevState.laps[i].d = 'yes';
            setTimeout(() => {
                this.setState((prevState, props) => {
                    delete prevState.laps[i];
                    return { laps: prevState.laps }
                });
            }, 200)
            return { laps: prevState.laps }
        });
    }

    closePopups = () => {
        this.setState({ 
            currentPopup: null,
            excerciseFormName: '',
            excerciseFormCount: '',
        });
    }

    render() {
        const { laps } = this.state;
        if (laps.length === 0) laps.push([]);

        let newExcerciseFormInvalid = true;
        if (this.state.currentPopup === "newExcercise") {
            newExcerciseFormInvalid = (this.state.excerciseFormName === '' || this.state.excerciseFormCount === '');
        }

        return (
            <StyledPage>
                <Section>
                    <div className="header">Workout Routine</div>
                    <NumberInput 
                        unit="sets" 
                        min="0"
                        max="999"
                        step="1"
                        fixedDecimals="0"
                        fallback={console.log} 
                    />
                    {Object.values(laps).map((lap, i) => (
                        <div className="lap" key={Object.keys(laps)[i]}>
                            <div className="lap_Name" deleted={lap.d}>
                                {i+1}{i >= names.length ? names[names.length-1] : names[i]} lap
                                <img 
                                    src={add_excercise} alt="+" 
                                    onClick={this.newExcercisePopup}
                                />
                                <img 
                                    src={delete_lap} alt="-" 
                                    onClick={this.deleteLapPopup}
                                    target={Object.keys(laps)[i]}
                                />
                            </div>
                            {lap.map((excercise, j) => (
                                <div className="excercise" key={j}>
                                    <img 
                                        src={settings} alt="?" 
                                        // TODO: onClick
                                        targetparent={Object.keys(laps)[i]}
                                        target={j}
                                    />
                                    <span>{excercise.n}</span>
                                    <span>{excercise.c} / <small>set</small></span>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={this.newLap}>Add a new lap</button>
                </Section>
                {this.state.currentPopup === "newExcercise" ? (
                <Popup 
                    closeHandler={this.closePopups}
                    title="Add an excercise"
                >
                    <SignForm onSubmit={this.newExcercise}>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={this.state.excerciseFormName}
                            onChange={this.onExcerciseFormChange}
                        />
                        <input
                            type="number"
                            placeholder="Repeats per set"
                            min="0"
                            name="count"
                            value={this.state.excerciseFormCount}
                            onChange={this.onExcerciseFormChange}
                        />
                        <button type="submit" disabled={newExcerciseFormInvalid}>
                            CONFIRM
                        </button>
                    </SignForm>
                </Popup>
                ) : null}
                {this.state.currentPopup === "deleteLap" ? (
                <Popup 
                    closeHandler={this.closePopups}
                    title={`Remove ${Number(this.state.popupData.i)+1}${this.state.popupData.lapName} lap`}
                >
                    <p>This lap contains excercises!</p>
                    <button 
                        onClick={this.deleteLapEvent}
                        target={this.state.popupData.i}
                    >
                    REMOVE
                    </button>
                </Popup>
                ) : null}
            </StyledPage>
        );
    }
}



const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(ConfigurePage);