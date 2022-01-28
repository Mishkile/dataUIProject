import React from 'react';
import './modal.css'

export default function Modal({modalActive, setModalActive, children}) {
  return(

    <div className={modalActive ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
      <div className={modalActive ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div> 

  )
}
