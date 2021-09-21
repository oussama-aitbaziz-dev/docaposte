import { useState } from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import api from "../../../services/";

const DeleteUserDialog = ({
  data,
  open,
  toggleDialog,
  toggleSnackbar,
  setSnackbarMsg,
  setUsers,
}) => {
  const [loading, setLoading] = useState(false);

  const { id, firstName, lastName, email } = data;

  const deleteUser = async () => {
    setLoading(true);
    try {
      await api.deleteUser({ id });
      // Update users list
      setUsers((prevState) => prevState.filter((user) => user.id !== id));
      setSnackbarMsg("L'utilisateur a été supprimé !");
    } catch (error) {
      if (error?.response?.status === 404)
        setSnackbarMsg("Cet utilisateur n'existe pas");
      else
        setSnackbarMsg(
          "Une erreur du serveur est survenue, veuillez réessayer plus tard."
        );
    } finally {
      setLoading(false);
      toggleSnackbar();
      toggleDialog();
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Voulez vous vraiment supprimer cet utilisateur ?
        </DialogContentText>
        <DialogContentText>
          {`${lastName}, ${firstName} (${email})`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog} disabled={loading}>
          Annuler
        </Button>
        <Button
          onClick={() => {
            deleteUser();
          }}
          autoFocus
          color="warning"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Confirmer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;

DeleteUserDialog.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  open: PropTypes.bool,
  toggleDialog: PropTypes.func,
  toggleSnackbar: PropTypes.func,
  setSnackbarMsg: PropTypes.func,
  setUsers: PropTypes.func,
};
