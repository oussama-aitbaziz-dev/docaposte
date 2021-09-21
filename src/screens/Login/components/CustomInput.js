import React from "react";
import PropTypes from "prop-types";

import { TextField } from "@mui/material";

const CustomInput = ({ form, type, label }) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      id={type}
      label={label}
      name={type}
      autoComplete={type}
      onChange={form.handleChange}
      value={form.values[type]}
      error={form.errors[type] && form.touched[type]}
      helperText={form.errors[type] ?? ""}
    />
  );
};

export default CustomInput;

CustomInput.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }),
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
