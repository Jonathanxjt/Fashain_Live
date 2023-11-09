<template>
    <div class="container" v-if="!isLoggedIn">
        <!-- login -->
        <template v-if="showLogin">
            <login-form @loggedIn="isLoggedIn = true" />
            <p>No account yet? <span @click="showLogin = false">Sign up</span> instead.</p>
        </template>
        <!-- or register -->
        <template v-else>
            <!-- listen for event -->
            <signup-form @loggedIn="isLoggedIn = true" />
            <p>Already registered? <a @click="showLogin = true">Login</a> instead.</p>
        </template>
    </div>
    <!-- is logged in -->
    <div v-else>
        <router-link to="/">Home</router-link>
    </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { auth } from "../firebase/init.js";
import { signOut } from "firebase/auth";

export default {
    components: { SignupForm, LoginForm },
    data() {
        return {
            isLoggedIn: false,
            showLogin: true,
            displayName: "",
        };
    },
    beforeUpdate() {
        if (auth.currentUser) {
            // set local 'displayName' to user's displayName
            this.displayName = auth.currentUser.displayName;
        }
    },
    methods: {
        signOut() {
            signOut(auth).then(() => {
                // user signed-out
                this.isLoggedIn = false;
            });
        },
    },
};
</script>
