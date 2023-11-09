<template>
    <div>
        <!-- this one is the section header -->
        <div class="mb-4">
            <h2 class="text-success mb-3">Sustainability Questionnaire</h2>
            <h5 class="text-success mb-3">Materials ♻️</h5>
            <!-- this one is like the questions for each section -->

            <p>Are your products made from recycled or upcycled materials?</p>
            <div class="form-group mb-3">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="recycledMaterials"
                        id="recycledMaterials"
                        value="yes"
                        :checked="data.recycledMaterials === 'yes'"
                        @change="updateData('recycledMaterials', $event.target.value)" />
                    <label class="form-check-label" for="recycledMaterials">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="recycledMaterials"
                        id="recycledMaterials2"
                        value="no"
                        :checked="data.recycledMaterials === 'no'"
                        @change="updateData('recycledMaterials', $event.target.value)" />
                    <label class="form-check-label" for="recycledMaterials2">No</label>
                </div>
            </div>
            <!-- 2nd question -->
            <p>Do you use organic, non-toxic, and/or renewable materials?</p>
            <div class="form-group mb-3">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="organic"
                        id="organic"
                        value="yes"
                        :checked="data.organicMaterials === 'yes'"
                        @change="updateData('organicMaterials', $event.target.value)" />
                    <label class="form-check-label" for="organic">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="organic"
                        id="organic2"
                        value="no"
                        :checked="data.organicMaterials === 'no'"
                        @change="updateData('organicMaterials', $event.target.value)" />
                    <label class="form-check-label" for="organic2">No</label>
                </div>
            </div>
            <!-- closing div tag for section header     -->
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-outline-success me-2" @click="prevStep">Previous</button>
            <button class="btn btn-outline-success" @click="nextStep">Next</button>
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
