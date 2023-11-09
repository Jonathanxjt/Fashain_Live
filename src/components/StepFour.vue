<template>
    <div>
        <!-- this one is the section header -->
        <div class="mb-4">
            <h5 class="text-success mb-3">Production 🌱</h5>
            <p>Is your manufacturing process eco-friendly?</p>
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="ecoFriendlyProduction"
                    id="ecoFriendlyProduction"
                    value="yes"
                    :checked="data.ecoFriendlyProduction === 'yes'"
                    @change="updateData('ecoFriendlyProduction', $event.target.value)" />
                <label class="form-check-label" for="ecoFriendlyProduction">Yes</label>
            </div>
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="ecoFriendlyProduction"
                    id="ecoFriendlyProduction2"
                    value="no"
                    :checked="data.ecoFriendlyProduction === 'no'"
                    @change="updateData('ecoFriendlyProduction', $event.target.value)" />
                <label class="form-check-label" for="ecoFriendlyProduction2">No</label>
            </div>
        </div>
        <div class="mb-4">
            <h5 class="text-success mb-3">Supply Chain & Labor Practices 🙆‍♂️</h5>

            <p>Do you have fair labor practices?</p>
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="practices"
                    id="practices"
                    value="yes"
                    :checked="data.fairLaborPractices === 'yes'"
                    @change="updateData('fairLaborPractices', $event.target.value)" />
                <label class="form-check-label" for="practices">Yes</label>
            </div>
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="radio"
                    name="practices"
                    id="practices2"
                    value="no"
                    :checked="data.fairLaborPractices === 'no'"
                    @change="updateData('fairLaborPractices', $event.target.value)" />
                <label class="form-check-label" for="practices2">No</label>
            </div>
        </div>

        <div class="d-flex justify-content-end">
            <button class="btn btn-outline-success me-2" @click="prevStep">Previous</button>
            <button v-if="data.type" class="btn btn-outline-success" @click="nextStep">Next</button>
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
