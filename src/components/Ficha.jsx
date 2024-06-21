import React from 'react';

function Ficha({ ficha, fichasHandler, index }) {
  const fichaIcono = () => {
    if (ficha === 1) {
      return <i className="bi bi-circle" style={{color : "red"}}></i>;
    }
    if (ficha === 0) {
      return <i className="bi bi-x-lg" style={{color : "blue"}}></i>;
    }
    if (ficha === -1) {
      return <i className="bi bi-question-lg" style={{color : "black"}}></i>;
    }
  };
    
  return (
    <div onClick={()=>fichasHandler(index)} className="col-4 d-flex justify-content-center align-items-center border border-dark p-5">
        {fichaIcono()}
    </div>
  );
}

export default Ficha;
