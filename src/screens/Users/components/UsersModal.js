import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Modal, Button, Typography, DialogActions } from "@mui/material";

import CustomInput from "../../../components/CustomInput";

import { useFormik } from "formik";
import * as Yup from "yup";

import api from "../../../services/";

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
  const { id, firstName, lastName, email } = data;

  // Handlers
  const handleEdit = async (data) => {
    setLoading(true);
    try {
      await api.updateUser(data);
      // Update users list
      setUsers((prevState) => {
        return prevState.map((user) => {
          if (user?.id === data?.id) return { id: user.id, ...data };

          return user;
        });
      });
      setSnackbarMsg(
        `L'utilisateur a été ${isEditMode ? "modifié" : "ajouté"} !`
      );
    } catch (error) {
      if (error?.response?.status === 404)
        setSnackbarMsg("Cet utilisateur n'existe pas");
      else
        setSnackbarMsg(
          "Une erreur du serveur est survenue, veuillez réessayer plus tard."
        );
    } finally {
      setLoading(false);
      form.handleReset();
      toggleSnackbar();
      toggleModal();
    }
  };

  const handleAdd = async (data) => {
    setLoading(true);
    try {
      const response = await api.createUser(data);
      // Update users list
      setUsers((prevState) => [
        { id: response.data.id, ...data },
        ...prevState,
      ]);
      setSnackbarMsg("L'utilisateur a été ajouté !");
    } catch (error) {
      if (error?.response?.status === 409)
        setSnackbarMsg("Cet utilisateur existe déja");
      else
        setSnackbarMsg(
          "Une erreur du serveur est survenue, veuillez réessayer plus tard."
        );
    } finally {
      setLoading(false);
      form.handleReset();
      toggleSnackbar();
      toggleModal();
    }
  };

  // Form
  const form = useFormik({
    initialValues: {
      firstName: isEditMode ? firstName : "",
      lastName: isEditMode ? lastName : "",
      email: isEditMode ? email : "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(
          new RegExp(/^[A-za-z\s'-]+$/gim),
          "Le prénom doit être au bon format"
        )
        .required("Champ requis"),
      lastName: Yup.string()
        .matches(
          new RegExp(/^[A-za-z\s'-]+$/gim),
          "Le Nom doit être au bon format"
        )
        .required("Champ requis"),
      email: Yup.string()
        .email("L'adresse email doit être au bon format")
        .required("Champ requis"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));

      if (isEditMode) handleEdit({ id, ...values });
      else handleAdd(values);
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
      <Modal open={open}>
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
              <Button type="submit" variant="contained" disabled={loading}>
                {loading
                  ? "Chargement..."
                  : `${isEditMode ? "Modifier" : "Ajouter"}`}
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersModal;

UsersModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  open: PropTypes.bool,
  toggleModal: PropTypes.func,
  setUsers: PropTypes.func,
  toggleSnackbar: PropTypes.func,
  setSnackbarMsg: PropTypes.func,
  isEditMode: PropTypes.bool,
};
