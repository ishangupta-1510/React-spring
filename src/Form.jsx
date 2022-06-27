import React, { useState } from "react";
import "./styles.css";
const Form = () => {
  const [valone, setValone] = useState();
  const [valtwo, setValtwo] = useState();
  const [valthree, setValthree] = useState(0);
  return (
      <>
        <form method="POST" className="up">
        <input
            value={valone}
            onChange={event => setValone(parseInt(event.target.value))}
            placeholder="First Value"
            type="number"
            name="valone"
            required
        />
        <input
            value={valtwo}
            onChange={event => setValtwo(parseInt(event.target.value))}
            placeholder="Second Value"
            type="number"
            name="valtwo"
            required
        />
        <button type="button" onClick={event => setValthree(valone+valtwo)}>Submit</button>
        <h1 className="check">{valthree}</h1>
        </form>
      </>
  );
};

export default Form;
