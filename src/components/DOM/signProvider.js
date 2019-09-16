import styled from 'styled-components';

const SignProvider = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    button[type=submit] {
        background: none;
        border: none;
        background-image: url(${props => props.src});
        background-size: contain;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        margin-bottom: 8px;
    }

    div {
        font-size: 13px;
        color: #3C3C3C;
    }

`;

export default SignProvider;