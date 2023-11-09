<template>
    <NavBar />
    <section class="mt-5 d-flex align-items-center justify-content-centre">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid"
                        alt="Sample image" />
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form href="#" @submit.prevent="signUp">
                        <div class="row">
                            <div class="col-md">
                                <div class="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        v-model="type"
                                        id="type"
                                        class="form-check-input"
                                        @click="onChange" />
                                    <label class="form-check-label" for="type">Are you a business?</label>
                                </div>
                            </div>
                        </div>
                        <!-- Email input -->
                        <div class="row">
                            <div class="col-md">
                                <div class="form-floating mb-3">
                                    <input
                                        type="username"
                                        placeholder="Username"
                                        required
                                        v-model="username"
                                        id="username"
                                        class="form-control"
                                        aria-describedby="usernameHelp" />
                                    <label id="usernameLabel" for="username">Username</label>
                                </div>
                            </div>
                            <!-- Email input -->
                            <div class="col-md">
                                <div class="form-floating mb-3">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        v-model="email"
                                        id="email"
                                        class="form-control"
                                        aria-describedby="emailHelp" />
                                    <label for="email">Email address</label>
                                </div>
                            </div>
                        </div>
                        <!-- Password input -->
                        <div class="form-floating mb-3">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                v-model="password"
                                id="password"
                                class="form-control" />
                            <label for="password">Password</label>
                        </div>

                        <div class="form-floating mb-3">
                            <vue-google-autocomplete
                                id="map"
                                classname="form-control"
                                ref="address"
                                v-on:placechanged="getAddressData"
                                :country="['sg']"></vue-google-autocomplete>
                            <label for="postcode">Address</label>
                        </div>
                        <div class="row">
                            <div class="col-md">
                                <div class="form-floating mb-3">
                                    <input
                                        type="text"
                                        placeholder="Block Number"
                                        required
                                        v-model="blockNumber"
                                        id="blockNumber"
                                        class="form-control" />
                                    <label for="blockNumber">Block Number</label>
                                </div>
                            </div>
                            <div class="col-md">
                                <div class="form-floating mb-3">
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        required
                                        v-model="postcode"
                                        id="postcode"
                                        class="form-control" />
                                    <label for="postcode">Postal Code</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                placeholder="Contact No."
                                required
                                v-model="contactno"
                                id="contactno"
                                class="form-control" />
                            <label for="contactno">Contact No.</label>
                        </div>
                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button
                                type="submit"
                                class="btn btn-primary btn-lg"
                                style="padding-left: 2.5rem; padding-right: 2.5rem">
                                Register
                            </button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">
                                Already have an account?
                                <a href="/login" class="link-danger">Log In</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import VueGoogleAutocomplete from "vue-google-autocomplete";
import NavBar from "../components/NavBar.vue";
import router from "../router";
export default {
    // components: { NavBar, VueGoogleAutocomplete },
    data() {
        return {
            username: "",
            email: "",
            password: "",
            address: "",
            blockNumber: "",
            postcode: "",
            contactno: "",
            type: false,
        };
    },
    methods: {
        onChange() {
            let e = document.getElementById("type");
            let username = document.getElementById("usernameLabel");
            if (e.checked) {
                username.textContent = "Business Name";
            } else {
                username.textContent = "Username";
            }
        },
        async signUp() {
            let business = this.type ? "business" : "user";
            try {
                await this.$store.dispatch("signUp", {
                    email: this.email,
                    password: this.password,
                    name: this.username,
                    type: business,
                    address: this.address,
                    blockNumber: this.blockNumber,
                    postcode: this.postcode,
                    contactno: this.contactno,
                });
                router.push("/");
                console.log("User signed up successfully!");
            } catch (err) {
                console.log(err);
            }
        },
        getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData;
        },
    },
};
</script>
