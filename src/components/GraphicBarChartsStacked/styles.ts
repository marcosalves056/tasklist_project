import styled from 'styled-components';

export const Container = styled.div`
      grid-template-columns: 1fr ;
      margin: 0rem 0.5rem 1rem 0 ;
      border-radius: 4px ;
      -webkit-box-shadow: 0px 0px 11px 6px rgba(0,0,0,0.26); 
      box-shadow: 0px 0px 11px 6px rgba(0,0,0,0.26);

      @media(max-width: 1010px){
            margin: 0rem 0 1rem 0 ;
      }
`