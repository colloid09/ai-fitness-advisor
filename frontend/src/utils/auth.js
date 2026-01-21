export function getUserEmail() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || null;
  } catch (e) {
    return null;
  }
}

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    JSON.parse(atob(token.split(".")[1]));
    return true;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
}
