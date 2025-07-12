

export const USERS = "http://localhost:3001/users"

export const API_URL = "http://localhost:3001/products";

export function checkSessionForAuth(route) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) 

    if (currentUser) {
        console.log("Current authenticated redirecting to:", route);
        window.location.href = route;
    }
}
export function checkSessionForIndex() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) 

    if (currentUser == null) {
        window.location.href = "/";
    }
}
export function checkAdminAccess() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "admin") {
        window.location.href = "/";
    }
}
 
