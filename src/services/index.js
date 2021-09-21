import axios from "axios";

import config from "../config";
import apiRoutesList from "./apiRoutesList";

const apiInstance = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const api = axios.create({
    baseURL: config.baseUrl,
    headers,
  });

  // UserServices
  const getUsers = () => {
    return api.get(apiRoutesList.users);
  };

  const createUser = ({ data }) => {
    return api.post(apiRoutesList.users, { ...data });
  };

  const updateUser = ({ data, id }) => {
    return api.put(`${apiRoutesList.users}/:${id}`, { ...data });
  };

  const deleteUser = ({ id }) => {
    return api.delete(`${apiRoutesList.users}/:${id}`);
  };

  return { getUsers, createUser, updateUser, deleteUser };
};

export default apiInstance;
