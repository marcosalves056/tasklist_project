import styled from 'styled-components';

interface MembersRowProps{
    color?: 'AdminRow' | 'UserRow'
  }
  
export const RowContainer = styled.tr<MembersRowProps>`
  
  display: ${props => props.color? 'flex': 'auto'};
  td{
    background-color: ${props => props.color == 'AdminRow' ? 'rgba(2, 64, 137, 0.3)' : 'var(--color-grey-secundary)'};
    padding-right: 8px;
    padding-top: .15rem ;
    padding-bottom: .15rem ;
    border-bottom: 2px solid var(--color-white-primary);
    width: ${props => props.color? '100%': 'auto'};
    justify-content: ${props => props.color? 'start': 'unset'};
    
  }
  img{
    height: 1.5rem;
    width: auto;
  }
  #tdIcon{
    width: ${props => props.color? '2.5rem': 'unset'};
    border-top-left-radius: ${props => props.color? '4px': 'unset'};
    border-bottom-left-radius: ${props => props.color? '4px': 'unset'};
  }
  #tdName{
    border-top-right-radius: ${props => props.color? '4px': 'unset'};
    border-bottom-right-radius: ${props => props.color? '4px': 'unset'};
  }
  #tdWeekly{
    text-align: center ;
  }
`