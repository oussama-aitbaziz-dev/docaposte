import { useEffect, useState } from "react";

import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";

import DeleteUserDialog from "./components/DeleteUserDialog";

import api from "../../services";
import { logout } from "../../utils";
import UsersTable from "./components/UsersTable";
import UsersModal from "./components/UsersModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Holds selected row data
  const [selectedRowData, setSelectedRowData] = useState({});

  // Delete User Dialog State
  const [open, setOpen] = useState(false);

  // Users Modal State
  const [openModal, setOpenModal] = useState(false);

  // Snackbar State
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(false);

  // Handlers
  const toggleDialog = () => {
    setOpen(!open);
  };
  const toggleSnackbar = () => {
    setShowSnackbar(!showSnackbar);
  };
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleAddUser = () => {
    toggleModal();
    setIsEditMode(false);
  };

  const handleEditUser = (data) => {
    setSelectedRowData(data);
    setIsEditMode(true);
    toggleModal();
  };

  const handleDeleteUser = (data) => {
    setSelectedRowData(data);
    toggleDialog();
  };

  // Get all users
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const users = await api.getUsers();
        if (users?.data?.length) setUsers(users.data);
      } catch (error) {
        setError(
          "Une erreur du serveur est survenue, veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: "2rem" }}>
      <DeleteUserDialog
        data={selectedRowData}
        open={open}
        toggleDialog={toggleDialog}
        setUsers={setUsers}
        toggleSnackbar={toggleSnackbar}
        setSnackbarMsg={setSnackbarMsg}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          toggleSnackbar();
          setSnackbarMsg("");
        }}
        message={snackbarMsg}
      />
      <UsersModal
        data={selectedRowData}
        open={openModal}
        toggleModal={toggleModal}
        setUsers={setUsers}
        toggleSnackbar={toggleSnackbar}
        setSnackbarMsg={setSnackbarMsg}
        isEditMode={isEditMode}
      />
      <Button
        variant="text"
        onClick={() => {
          logout();
        }}
      >
        Déconnexion
      </Button>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && (
          <Alert severity="error" sx={{ margin: "2rem 0" }}>
            {error}
          </Alert>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          <UsersTable
            users={users}
            handleAddUser={handleAddUser}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />
        )}
      </Box>
    </Container>
  );
};

export default Users;
