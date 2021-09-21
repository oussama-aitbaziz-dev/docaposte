import { Button } from "@mui/material";
import {
  DataGridPro,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid-pro";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const UsersTable = ({
  users,
  handleAddUser,
  handleEditUser,
  handleDeleteUser,
}) => {
  const columns = [
    { field: "firstName", headerName: "Prénom", width: 150 },
    { field: "lastName", headerName: "Nom", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            color="inherit"
            onClick={() => {
              handleEditUser(row);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => {
              handleDeleteUser(row);
            }}
          />,
        ];
      },
    },
  ];

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
  );
};

export default UsersTable;
