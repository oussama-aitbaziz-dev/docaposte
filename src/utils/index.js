const login = () => {
  localStorage.setItem("token-docaposte", "faketoken");
  window.location.replace("/");
};

const logout = () => {
  localStorage.removeItem("token-docaposte");
  window.location.replace("/login");
};

const isLoggedIn = () => {
  const token = localStorage.getItem("token-docaposte");

  if (token) return true;

  return false;
};

export { login, logout, isLoggedIn };
