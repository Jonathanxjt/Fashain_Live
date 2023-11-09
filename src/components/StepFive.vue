<template>
    <div>
        <!-- this one is the section header -->
        <div class="mb-4">
            <h5 class="text-success mb-3">Packaging & Distribution 📦</h5>

            <p>Do you use eco-friendly packaging?</p>
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="packaging"
                    id="packaging"
                    value="yes"
                    :checked="data.ecoFriendlyPackaging === 'yes'"
                    @change="updateData('ecoFriendlyPackaging', $event.target.value)" />
                <label class="form-check-label" for="packaging">Yes</label>
            </div>
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="packaging"
                    id="packaging2"
                    value="no"
                    :checked="data.ecoFriendlyPackaging === 'no'"
                    @change="updateData('ecoFriendlyPackaging', $event.target.value)" />
                <label class="form-check-label" for="packaging2">No</label>
            </div>
        </div>
        <div class="mb-4">
            <h5 class="text-success mb-3">Company Policies 📑</h5>

            <p>Do you have a formal sustainability policy?</p>
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="policy"
                    id="policy"
                    value="yes"
                    :checked="data.sustainabilityPolicy === 'yes'"
                    @change="updateData('sustainabilityPolicy', $event.target.value)" />
                <label class="form-check-label" for="policy">Yes</label>
            </div>
            <div class="form-check form-check-inline mb-3">
                <input
                    class="form-check-input"
                    type="radio"
                    name="policy"
                    id="policy2"
                    :checked="data.sustainabilityPolicy === 'no'"
                    value="no"
                    @change="updateData('sustainabilityPolicy', $event.target.value)" />
                <label class="form-check-label" for="policy2">No</label>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-outline-success me-2" @click="prevStep">Previous</button>
            <button class="btn btn-outline-success me-2" @click="nextStep">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data", "prevStep", "nextStep"],
    methods: {
        updateData(key, value) {
            this.$emit("update-data", { key, value });
        },
    },
};
</script>
