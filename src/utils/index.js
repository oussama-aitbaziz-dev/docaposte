const login = (rememberMe) => {
  if (rememberMe) localStorage.setItem("token-docaposte", "faketoken");
  else sessionStorage.setItem("token-docaposte", "faketoken");
  window.location.replace("/");
};

const logout = () => {
  localStorage.removeItem("token-docaposte");
  sessionStorage.removeItem("token-docaposte");
  window.location.replace("/login");
};

const isLoggedIn = () => {
  const token =
    localStorage.getItem("token-docaposte") ||
    sessionStorage.getItem("token-docaposte");

  if (token) return true;

  return false;
};

export { login, logout, isLoggedIn };
