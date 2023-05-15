import styled from 'styled-components'

export const Container = styled.div`

    max-width: fit-content;
    display: flex;
    flex-direction: column;
    

    div{
        display: flex ;
        flex: 1;
        flex-direction: column;
        height: fit-content;
        max-height: 7rem;
    }

    .labelGroup {
        display: flex;
        flex-direction: row ;
        flex: 1;
    }

    
    .filterInput{ 
        .icons{
            height:0.95rem;
            cursor: pointer;
            color:var(--primary-color);
        }
    }
    .filter-name{
        cursor: pointer;
    }
    
`
