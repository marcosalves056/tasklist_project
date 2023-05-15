import styled from 'styled-components';

export const Container = styled.div`
border-collapse: collapsed ;
border-spacing: 0 ;
max-width: 100%;
overflow-x: scroll;
overflow-y: scroll;
border-radius: 4px;
display: table-cell;

  #modalBody {
    display: block;
    flex: 1;
    max-width: 100%;
    height: fit-content;
    max-height: 40rem;
    min-height:  30rem;

    ::-webkit-scrollbar {
      height: 0.3125rem;
      justify-content: center;
      align-items: center;
      padding: none;
      margin: none;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
      background-color: var(--color-grey-secundary);
      height: 0.4375rem;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--primary-color);
      border-radius: 4px;
    }

  }

  #divLoading{
    margin: auto;
  }

  select[multiple]{
    -webkit-flex: 1 1;
    flex: 1 1;
    width: 100% ;
    flex-direction: column;
    background-color: var(--color-white-primary);
    border-radius: 0.25rem;
    border: none ;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-bottom: .25rem;
    height: fit-content;

    :hover {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }
    
    :focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }

    option{
        background-color: var(--color-grey-secundary);
        border-radius: 4px ;
        padding: .25rem ;
        margin: .15rem 0 ;
        color: var(--text-black-primary);
        
        :hover{
            background-color: var(--color-grey-primary) ;
        }

    }

    ::-webkit-scrollbar{
        height: 0.3125rem;
        justify-content: center;
        align-items: center;
        padding: none;
        margin: none;
        border-radius: 4px;
        width: 4px ;
    }

    ::-webkit-scrollbar-track{
        background-color: var(--color-grey-secundary);
        height: 0.4375rem;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: var(--primary-color);
        border-radius: 4px;
    }

  }
`;
