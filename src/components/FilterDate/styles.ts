import styled from 'styled-components'

export const Container = styled.div`
    #spanX{
        z-index: 5;
        text-align: end;
        width: fit-content;
        color: var(--primary-color);
        position: relative;
        left: 190px;
        cursor: pointer;
    }
    #modal{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 30rem;
        width: fit-content;
    }
    #modalTop{
        display: flex;
        flex-direction: row;
        width: 100%;
        button{
            align-self: flex-end;
        }
    }
    #modalBody{
        padding: 0 !important;
    }
    #modalBotton{
        display: flex;
        align-self: flex-end;
        align-items: flex-end;
        button{
            margin-bottom: 0.5rem;;
        }
    }
    .sc-BeQoi{
        margin: auto;
    }
    .rdrMonthAndYearWrapper{
        display: flex;
        flex-direction: column;
        min-height: 3rem;
        justify-self: flex-start;
    }
    .rdrDays{
        max-width: 15rem;
    }
`
