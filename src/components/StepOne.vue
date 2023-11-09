<template>
    <div>
        <h2 class="mb-3 text-success">Create an account</h2>

        <!-- Email input -->
        <div class="row">
            <div class="col-md">
                <div class="form-floating mb-3">
                    <input
                        type="username"
                        placeholder="Username"
                        required
                        :value="data.username"
                        id="username"
                        class="form-control"
                        @input="updateData('username', $event.target.value)"
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
                        :value="data.email"
                        id="email"
                        @input="updateData('email', $event.target.value)"
                        class="form-control"
                        aria-describedby="emailHelp" />
                    <label for="email">Email address</label>
                </div>
            </div>
        </div>
        <div class="form-floating mb-3">
            <input
                type="password"
                placeholder="Password"
                required
                :value="data.password"
                id="password"
                @input="updateData('password', $event.target.value)"
                class="form-control" />
            <label for="password">Password</label>
        </div>

        <div class="row">
            <div class="col-md">
                <div class="form-check mb-3">
                    <input
                        type="checkbox"
                        :checked="data.type"
                        @input="updateData('type', $event.target.checked)"
                        id="type"
                        class="form-check-input"
                        @click="onChange" />
                    <label class="form-check-label" for="type">Are you a business?</label>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-outline-success" @click="nextStep">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data", "nextStep"],
    methods: {
        updateData(key, value) {
            this.$emit("update-data", { key, value });
        },
    },
};
</script>
