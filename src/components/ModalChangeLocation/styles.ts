import styled from 'styled-components';

export const Container = styled.div`
border-collapse: collapsed ;
border-spacing: 0 ;
max-width: 100%;
overflow-x: scroll;
overflow-y: scroll;
border-radius: 4px;
display: table-cell;
  #ModalBody {
    display: block;
    flex: 1;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
    width: 100vw;
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

  
`