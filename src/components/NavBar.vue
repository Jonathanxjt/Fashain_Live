<template>
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar-bg">
        <div class="container-fluid">
            <a class="navbar-brand m-0 p-0" href="/">
                <img src="../assets/fashainIcon.png" style="width: 40px; height: 40px" />
            </a>
            <button
                class="navbar-toggler"
                style="background-color: green"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"></li>
                </ul>
                <div class="d-flex">
                    <a v-if="checkAuth == null" type="button" class="btn btn-custom-outline me-2" href="/login"
                        >Log In</a
                    >

                    <button type="button" class="btn btn-custom-outline me-2" @click="goToUpcyclingHubs()">
                        Upcycling Hub
                    </button>

                    <div v-if="checkAuth != null" class="dropdown">
                        <a
                            class="m-2 nav-link dropdown-toggle"
                            role="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-person-circle"
                                viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                    fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item" href="/profile">Profile</a></li>
                            <li><a class="dropdown-item" href="#" v-on:click="logout">Log out</a></li>
                        </ul>
                    </div>

                    <button type="button" class="btn nav-link m-2" @click="goToCartPage">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-cart"
                            viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/init.js";
import router from "../router";
export default {
    name: "NavBar",
    data() {
        return {
            checkAuth: null,
        };
    },
    methods: {
        logout() {
            signOut(auth).then(() => {
                localStorage.removeItem("user_uid");
                router.push("/");
            });
        },
        goToCartPage() {
            router.push({ name: "Cart" });
        },
        goToUpcyclingHubs() {
            router.push({ name: "Upcycling" });
        },
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.checkAuth = user;
            } else {
                this.checkAuth = null;
            }
        });
    },
};
</script>

<style scoped>
.custom-navbar-bg {
    background-color: #fcf7eb !important;
}

.btn-custom-search {
    background-color: transparent;
    border: 1px solid #665c37;
    color: #665c37;
    transition: all 0.3s ease;
}

.btn-custom-search:hover {
    background-color: #665c37;
    color: white;
    border: 2px solid #665c37;
}
.btn-custom-outline {
    background-color: transparent;
    border: 1px solid #665c37;
    color: #665c37;
}

.btn-custom-outline:hover,
.btn-custom-outline:focus {
    background-color: #665c37;
    color: white;
    border: 1px solid #665c37;
}
</style>
