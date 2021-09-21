import React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import CustomInput from "../../components/CustomInput";

import { useFormik } from "formik";
import * as Yup from "yup";

import { login } from "../../utils";

const Login = () => {
  const form = useFormik({
    initialValues: { email: "", password: "", rememberMe: false },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("L'adresse email doit être au bon format")
        .required("Champ requis"),
      password: Yup.string().required("Champ requis"),
    }),
    onSubmit: ({ rememberMe }) => {
      login(rememberMe);
    },
  });

  const { handleSubmit, handleChange } = form;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <CustomInput form={form} name="email" type="email" label="Email" />
          <CustomInput
            form={form}
            name="password"
            type="password"
            label="Mot de passe"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                name="rememberMe"
                onChange={handleChange}
                checked={form.values.rememberMe}
              />
            }
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
