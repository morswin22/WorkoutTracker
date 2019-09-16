import styled from 'styled-components';

const SignForm = styled.form`
    width: 100%;
    margin: 0;
    padding-bottom: 1px;

    div.header {
        font-size: 22px;
        display: flex;
        height: 80px;
        align-items: center;
        justify-content: center;
    }

    input[type=text], input[type=password] {
        width: 260px;
        height: 40px;
        box-sizing: border-box;
        margin: 0 auto 18px;
        border: 2px solid #DDDDDD;
        
        font-family: Roboto;
        font-size: 18px;
        display: flex;
        align-items: center;
        color: #3C3C3C;

        padding: 0 10px;

        ::placeholder {
            display: flex;
            align-items: center;
            color: #CECECE;
        }

    }

    button[type=submit] {
        width: 260px;
        height: 40px;
        box-sizing: border-box;
        margin: 0 auto 18px;
        background-color: #DDDDDD;
        border: none;
        
        font-family: Roboto;
        font-weight: bold;
        font-size: 18px;

        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.05em;

        color: #FFFFFF;
    }
`;

export default SignForm;