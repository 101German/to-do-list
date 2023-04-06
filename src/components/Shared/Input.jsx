import React from "react";

function InputField(props) {
  return (
    <input
      type={props.typeInput}
      placeholder={props.placeholder}
      className={props.styleName}
      value={props.value}
      onChange={props.handleChangeValue}
    />
  );
}

export default InputField;
