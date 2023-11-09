<template>
    <div>
        <!-- this one is the section header -->
        <div class="mb-4">
            <div class="form-group mb-3">
                <label for="sustainabilityCommitmentRating"
                    >How would you rate your company's commitment to sustainability on a scale of 1 to 5?</label
                >
                <select
                    class="form-control mt-3"
                    id="sustainabilityCommitmentRating"
                    name="sustainabilityCommitmentRating"
                    :value="data.sustainabilityCommitmentRating"
                    @change="updateData('sustainabilityCommitmentRating', $event.target.value)">
                    <option value="Select an Option" disabled selected hidden>--Select an Option--</option>
                    <option value="1">1 (Lowest Commitment)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 (Highest Commitment)</option>
                </select>

                <div class="mb-4">
                    <h5 class="text-success mb-3">Verification Images 📸</h5>

                    <div class="form-group">
                        <label for="verificationImage" class="mb-2">Upload image(s) for verification:</label>
                        <input
                            type="file"
                            class="form-control"
                            id="verificationImage"
                            name="verificationImage"
                            accept="image/*"
                            multiple
                            @change="updateData('verificationImages', $event.target.files)" />
                        <small class="form-text text-muted">You can upload multiple images for verification.</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-outline-success me-2" @click="prevStep">Previous</button>

            <button @click="submitForm" class="btn btn-success">Submit</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data", "prevStep", "submitForm"],
    methods: {
        updateData(key, value) {
            this.$emit("update-data", { key, value });
        },
    },
};
</script>
