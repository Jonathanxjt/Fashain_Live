<template>
    <NavBar />
    <section class="mt-5 d-flex align-items-center justify-content-centre">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="../assets/carousel/1.png" class="img-fluid" alt="Sample image" />
                </div>
                <div class="col-md-8 col-lg-6 col-xl-5 offset-xl-1">
                    <div class="container d-flex">
                        <form href="#" @submit.prevent="logIn">
                            <h2 class="text-success mb-2">Login to your account</h2>
                            <!-- Email input -->
                            <div class="form-floating">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    v-model="email"
                                    id="email"
                                    class="form-control mb-3"
                                    aria-describedby="emailHelp" />
                                <label for="email">Email address</label>
                            </div>
                            <!-- Password input -->
                            <div class="form-floating">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    v-model="password"
                                    id="password"
                                    class="form-control mb-3" />
                                <label for="password">Password</label>
                            </div>
                            <div class="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    class="btn btn-success btn-lg"
                                    style="padding-left: 2.5rem; padding-right: 2.5rem">
                                    Login
                                </button>
                                <p class="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?
                                    <a href="/signup" class="link-danger">Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    components: { NavBar },
    name: "LoginForm",
    setup() {
        const email = ref("");
        const password = ref("");
        const router = useRouter();
        const store = useStore();
        const logIn = async () => {
            // register new user
            try {
                await store.dispatch("logIn", {
                    email: email.value,
                    password: password.value,
                });
                router.push("/");
                console.log("Signed in!");
                console.log(store.state.user);
            } catch (err) {
                console.log(err);
            }
        };
        return { logIn, email, password };
    },
};
</script>
