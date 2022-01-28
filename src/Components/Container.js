import React from 'react';

export default function Container({title, body, foot}) {
  return (
    <div className='edit-section'>
    <div className="edit-body m-3 p-3">
    <div className="container-text">
      <h3 className="title">{title}</h3>
      <p className="text">{body}</p>
    </div>
  </div>
  <div className='edit-foot mb-3'>
      <p className='foot-text not-select'>{foot}</p>
  </div>
  </div>
  )
}
