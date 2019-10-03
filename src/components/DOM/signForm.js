import styled from 'styled-components';

const SignForm = styled.form`
    width: 100%;
    margin: 0;
    padding-bottom: 1px;

    input[type=text], input[type=password], input[type=number] {
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

    label {
        margin: 0 auto 18px;
        display: flex;
        width: 260px;
        min-height: 20px;
        
        align-items: center;
        justify-content: center;
        text-align: justify;

        cursor: pointer;

        input[type="checkbox"] {
            margin-right: 10px;
        }
    }

    p.error {
        display: block;
        width: 260px;
        margin: 0 auto 18px;
        position: relative;
        padding-left: 8px;

        ::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: red;
        }
    }

    button[type=submit] {
        width: 260px;
        height: 40px;
        box-sizing: border-box;
        margin: 0 auto 18px;
        background-color: #7EBD2D;
        border: none;
        
        font-family: Roboto;
        font-weight: bold;
        font-size: 18px;

        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.05em;

        color: #FFFFFF;

        transition: background-color 200ms ease-in-out;

        :disabled {
            background-color: #DDDDDD;
        }
    }
`;

export default SignForm; // TODO: Change name to Form