import React from "react";
import PropTypes from "prop-types";

import { TextField } from "@mui/material";

const CustomInput = ({ form, type, name, label }) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      id={type}
      label={label}
      name={name}
      autoComplete={type}
      type={type}
      onChange={form.handleChange}
      value={form.values[name]}
      error={form.errors[name] && form.touched[name]}
      helperText={form.errors[name] ?? ""}
    />
  );
};

export default CustomInput;

CustomInput.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }),
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
