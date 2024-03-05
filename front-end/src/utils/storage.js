export const store = (response) => {
localStorage.setItem("user", JSON.stringify(response));
};
export const withdraw = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};
export const remove = () => {
  localStorage.removeItem("user");
};
