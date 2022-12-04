function setAuthUser(user) {
    localStorage.setItem("authUser", JSON.stringify(user));
}

function getAuthUser() {
    const user = localStorage.getItem("authUser");
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

function removeAuthUser() {
    localStorage.removeItem("authUser");
}

export default { setAuthUser, getAuthUser, removeAuthUser };
