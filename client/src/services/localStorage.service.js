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

function getCart() {
    const cart = localStorage.getItem("Cart");

    return JSON.parse(cart);
}

function setCart(cart) {
    localStorage.setItem("Cart", cart);
}

function removeCart() {
    localStorage.removeItem("Cart");
}

export default {
    setAuthUser,
    getAuthUser,
    removeAuthUser,
    getCart,
    setCart,
    removeCart
};
