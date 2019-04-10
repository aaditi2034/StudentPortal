import React from 'react';

const Input = (props) => {
  const {
    title, inputType, name, value, placeholder, onChange, onClick,
  } = props;
  return (
    <div className="row-label">
      <div id="label-id">
        {title}
      </div>
      <div id="input-id">
        <input
          type={inputType}
          className="form-control"
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Input;
