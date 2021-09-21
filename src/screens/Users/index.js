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

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedRowData, setSelectedRowData] = useState({});

  // Delete User Dialog State
  const [open, setOpen] = useState(false);

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

  const handleAddUser = () => {};

  const handleEditUser = (data) => {
    setSelectedRowData(data);
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
