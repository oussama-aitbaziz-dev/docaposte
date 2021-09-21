import { useEffect, useState } from "react";

import { Button, CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import api from "../../services";
import { logout } from "../../utils";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserEdit = (id) => {
    console.log("handleUserUpdate", id);
  };
  const handleUserDelete = (id) => {
    console.log("handleUserDelete", id);
  };
  const handleAddUser = () => {
    console.log("handleAddUser");
  };

  const columns = [
    { field: "firstName", headerName: "Prénom", width: 130 },
    { field: "lastName", headerName: "Nom", width: 130 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            color="inherit"
            onClick={() => {
              handleUserEdit(id);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => {
              handleUserDelete(id);
            }}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const users = await api.getUsers();
        if (users?.data?.length) setUsers(users.data);
      } catch (error) {
        setError("Une erreur inattendue est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const EditToolbar = () => {
    return (
      <GridToolbarContainer onClick={handleAddUser}>
        <Button color="primary" startIcon={<AddIcon />}>
          Ajouter un utilisateur
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: "2rem" }}>
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
        {loading ? (
          <CircularProgress />
        ) : (
          <div style={{ height: 400, width: "100%" }}>
            <DataGridPro
              rows={users}
              columns={columns}
              components={{
                Toolbar: EditToolbar,
              }}
              hideFooter
            />
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Users;
