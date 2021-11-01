import React from "react";

const Gender = (props) => {
  return (
    <label class="block text-left" style={{ "max-width": "400px" }}>
      <select
        onChange={(e) => {
          props.handleInputChangeKeyValue("Gender", e.target.value);
        }}
        class="form-select block w-full mt-1"
      >
        <option>Male</option>
        <option>Female</option>
        <option>Others</option>
      </select>
    </label>
  );
};

export default Gender;
