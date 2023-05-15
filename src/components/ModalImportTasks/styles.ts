import styled from 'styled-components';

export const Container = styled.div`

    input{
        display: inline-block;
        color: var(--text-black-primary);
        outline: none;
        cursor: pointer;
        ::-webkit-file-upload-button {
            background: var(--primary-color);
            border-radius: 4px;
            border: 0.125rem solid var(--primary-color);
            color: var(--text-white-primary);
            cursor: pointer;
        }
    }
`