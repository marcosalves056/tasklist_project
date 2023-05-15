import { ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../services/context';
import { ButtonClose } from '../../util/ButtonClose';
import { Container } from './styles';

/*########################################################## 
***Version

    220602  FGF                 Initial Version

***Description***

    component ModalGeneric

***Props***
    children                    Modal content
    functionSetModal            Set modal visible or not  
    onScroll                    Verify scroll event function     

##########################################################*/

interface ModalProps {
  children: ReactNode;
  functionSetModal: () => void;
  onScroll?: any//expected: event function
}

interface ModalTopProps {
  children: ReactNode;
  functionSetModal: () => void;
}

interface ModalBodyProps {
  children: ReactNode;
}

interface ModalBottonProps {
  children: ReactNode;
}

export function ModalTop({ children, functionSetModal }: ModalTopProps) {

  return (
    <div id='modalTop'>
      <span>{children}</span>
      <ButtonClose functionButtonClose={functionSetModal}/>
    </div>
  );
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div id='modalBody'>{children}</div>;
}

export function ModalBotton({ children }: ModalBottonProps) {
  return <div id='modalBotton'>{children}</div>;
}

export function Modal({ children, functionSetModal, onScroll }: ModalProps) {

  const { t } = useTranslation()
  const { clickOutside, setClickOutside } = useContext(AppContext);

  //Function to identify clicks outside the modal
  function onClickOutside() {
    if (clickOutside === true) { //If click outside with changes, pop confirm
      let confirmation = confirm(
        t('You are about to close without saving changes. Do you confirm this action?')
      );
      if (confirmation === true) { //If confirmed, close modal
        functionSetModal();
        setClickOutside(false);
      } 
      }else {
        functionSetModal(); //If click outside without changes, close modal
        setClickOutside(false);
    }
  }
  
  return (
    <Container>
      <span
        id='spanInvisible'
        onClick={() => {
          onClickOutside();
        }}
      ></span>
      {onScroll? <div id='modal' onScroll={onScroll()}>{children}</div> : <div id='modal'>{children}</div>}
    </Container>
  );
}
function useTranslate(): { t: any; } {
  throw new Error('Function not implemented.');
}

