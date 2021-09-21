import { useState } from "react";
import { Box, Modal, Button, Typography, DialogActions } from "@mui/material";

import CustomInput from "../../../components/CustomInput";

import { useFormik } from "formik";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

const UsersModal = ({
  data,
  open,
  toggleModal,
  setUsers,
  toggleSnackbar,
  setSnackbarMsg,
  isEditMode,
}) => {
  const [loading, setLoading] = useState(false);

  const { firstName, lastName, email } = data;

  const regex = {
    name: /^[A-za-z\s'-]+$/gim,
  };

  const form = useFormik({
    initialValues: {
      firstName: isEditMode ? firstName : "",
      lastName: isEditMode ? lastName : "",
      email: isEditMode ? email : "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(regex.name, "Le prénom doit être au bon format")
        .required("Champ requis"),
      lastName: Yup.string()
        .matches(regex.name, "Le Nom doit être au bon format")
        .required("Champ requis"),
      email: Yup.string()
        .email("L'adresse email doit être au bon format")
        .required("Champ requis"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true,
  });

  const { handleSubmit } = form;

  const handleModalClose = () => {
    form.handleReset();
    toggleModal();
  };
  return (
    <div>
      <Modal open={open} onBackdropClick={handleModalClose}>
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            {`${isEditMode ? "Modifier" : "Ajouter"} un utilisateur`}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CustomInput
              form={form}
              name="firstName"
              type="text"
              label="Prénom"
            />
            <CustomInput form={form} name="lastName" type="text" label="Nom" />
            <CustomInput form={form} name="email" type="email" label="Email" />

            <DialogActions>
              <Button
                variant="outlined"
                onClick={handleModalClose}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button type="submit" variant="contained">
                {`${isEditMode ? "Modifier" : "Ajouter"}`}
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersModal;
