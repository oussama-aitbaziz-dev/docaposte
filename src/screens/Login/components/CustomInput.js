import { TextField } from "@mui/material";
import React from "react";

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
