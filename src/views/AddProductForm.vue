<template>
    <NavBar />

    <form class="container mt-5 m-auto" href="#" @submit.prevent="addProduct">
        <div class="row">
            <div class="col-4">
                <div class="card text-center mb-3">
                    <div class="card-body">
                        <div
                            class="p-2 p-12 bg-gray-100 border border-gray-300"
                            @dragover="dragover"
                            @dragleave="dragleave"
                            @drop="drop">
                            <input
                                type="file"
                                multiple
                                name="fields[assetsFieldHandle][]"
                                id="assetsFieldHandle"
                                class="w-px h-px opacity-0 overflow-hidden absolute"
                                @change="onChangeImage"
                                ref="file"
                                accept=".pdf,.jpg,.jpeg,.png" />

                            <label for="assetsFieldHandle" class="block cursor-pointer">
                                <div>
                                    <a class="btn btn-success">Select photos</a>
                                    <p>or drag photos here</p>
                                </div>
                            </label>
                            <ul
                                class="mt-4 list-group m-2 row list-group-horizontal"
                                v-if="this.filelist.length"
                                v-cloak>
                                <li
                                    class="text-sm p-1 col-12 col-sm-6 col-md-4 col-lg-3 list-group-item"
                                    v-for="url in urlList"
                                    :key="url">
                                    <img class="img-thumbnail" v-if="url" :src="url" /><button
                                        class="ml-2 btn btn-sm btn-danger"
                                        type="button"
                                        @click="remove(urlList.indexOf(url))"
                                        title="Remove file">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-trash"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title mb-3">Category</h5>
                        <select
                            required
                            class="form-select form-select-md m-0"
                            v-model="product.category"
                            aria-label=".form-select-lg example">
                            <option hidden selected disabled>Choose clothing type</option>

                            <optgroup label="Women">
                                <option value="W Shirt">Shirt</option>
                                <option value="W Pants">Pants</option>
                                <option value="W Shorts">Shorts</option>
                            </optgroup>
                            <optgroup label="Men">
                                <option value="M Shirt">Shirt</option>
                                <option value="M Pants">Pants</option>
                                <option value="M Shorts">Shorts</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title mb-3">Type</h5>
                        <div class="d-flex">
                            <input
                                type="radio"
                                class="btn-check"
                                name="type"
                                v-model="product.type"
                                value="New"
                                id="new"
                                autocomplete="off" />
                            <label class="btn btn-outline-success me-2" for="new">Brand New</label>

                            <input
                                type="radio"
                                class="btn-check"
                                name="type"
                                value="Pre-loved"
                                v-model="product.type"
                                id="used"
                                autocomplete="off" />
                            <label class="btn btn-outline-success me-2" for="used">Pre-loved</label>
                            <input
                                type="radio"
                                class="btn-check"
                                name="type"
                                value="Rental"
                                v-model="product.type"
                                id="rental"
                                autocomplete="off" />
                            <label class="btn btn-outline-success" for="rental">Rental</label>
                        </div>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title mb-3">Sizes available</h5>
                        <div class="d-flex">
                            <button type="button" @click="onChangeSize" class="me-1 btn btn-outline-success">XS</button>
                            <button type="button" @click="onChangeSize" class="me-1 btn btn-outline-success">S</button>
                            <button type="button" @click="onChangeSize" class="me-1 btn btn-outline-success">M</button
                            ><button type="button" @click="onChangeSize" class="me-1 btn btn-outline-success">L</button>
                            <button type="button" @click="onChangeSize" class="me-1 btn btn-outline-success">XL</button>
                        </div>
                    </div>
                </div>

                <div v-if="sizeList.length" class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title mb-3">Quantity</h5>
                        <div class="row m-0">
                            <div
                                class="form-floating col-12 col-sm-4 col-md-3 col-lg-2 ps-0 me-2"
                                v-for="size in sizeList"
                                :key="size">
                                <input type="number" class="form-control" required :id="size" placeholder="" />
                                <label :for="size">{{ size }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="sizeList.length" class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title mb-3">Details</h5>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="name"
                                required
                                placeholder="Name"
                                v-model="product.name" />
                            <label for="name">Name</label>
                        </div>
                        <div class="form-floating">
                            <textarea
                                class="form-control"
                                id="description"
                                required
                                style="height: 100px"
                                placeholder="Description"
                                v-model="product.description"></textarea>
                            <label for="description">Description</label>
                        </div>
                    </div>
                </div>
                <div v-if="sizeList.length" class="card mb-3">
                    <div class="card-body">
                        <div class="input-group">
                            <div class="input-group-text">S$</div>
                            <input
                                type="number"
                                class="form-control"
                                required
                                id="price"
                                placeholder="Price"
                                v-model="product.price" />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </form>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import { setDoc, query, getFirestore, onSnapshot, updateDoc, doc, deleteDoc, arrayUnion } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import router from "../router";
import { toRaw } from "vue";
// Create a root reference
const storage = getStorage();

const db = getFirestore();

export default {
    delimiters: ["${", "}"], // Avoid Twig conflicts
    data() {
        return {
            filelist: [], //Store file information
            urlList: [], //Stores image direct url for displaying
            sizeList: [],
            uploadValue: 0,
            // set a new unique id for every form
            unique_id: Math.random().toString(36).substr(2, 9),
            product: {
                name: "",
                price: 0,
                quantity: {},
                category: "",
                images: [],
                description: "",
                type: "",
                uid: localStorage.getItem("user_uid"),
            },
        }; // Store our uploaded files
    },
    methods: {
        //Drag and drop image upload
        onChangeImage() {
            console.log(this.$refs.file.files[0]);
            var file = this.$refs.file.files[0];
            this.filelist.push(file);
            this.uploadImageAndReturnURL(file);
        },

        /**
         * Removes an element from the filelist and urlList arrays at the specified index.
         *
         * @param {number} i - The index of the element to be removed.
         * @return {void} This function does not return anything.
         */
        remove(i) {
            let file = this.filelist.splice(i, 1);

            this.urlList.splice(i, 1);
            this.deleteImage(file);
        },
        deleteImage(deleteImage) {
            const path = `folder/products/${this.unique_id}/${deleteImage[0].name}`;
            console.log(path);
            const storageRef = ref(storage, path);

            deleteObject(storageRef)
                .then(() => {
                    console.log("Image deleted");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        dragover(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains("bg-green-300")) {
                event.currentTarget.classList.remove("bg-gray-100");
                event.currentTarget.classList.add("bg-green-300");
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.add("bg-gray-100");
            event.currentTarget.classList.remove("bg-green-300");
        },
        /**
         * Handles the drop event.
         *
         * @param {Event} event - The drop event object.
         * @return {void}
         */
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChangeImage(); // Trigger the onChange event manually
            console.log("drop");
            // Clean up
            event.currentTarget.classList.add("bg-gray-100");
            event.currentTarget.classList.remove("bg-green-300");
        },

        // Type
        onChangeType(e) {
            e.target.classList.toggle("btn-outline-success");
            e.target.classList.toggle("btn-success");
        },

        // Sizing
        onChangeSize(e) {
            e.target.classList.toggle("btn-outline-success");
            e.target.classList.toggle("btn-success");

            if (this.sizeList.includes(e.target.textContent)) {
                this.sizeList.splice(this.sizeList.indexOf(e.target.textContent), 1);
            } else {
                this.sizeList.push(e.target.textContent);
            }
        },

        async uploadImageAndReturnURL(file) {
            const storage = getStorage();
            const path = `folder/products/${this.unique_id}/${file.name}`;
            const storageRef = ref(storage, path);
            console.log(path);
            await uploadBytes(storageRef, file)
                .then((snapshot) => {
                    console.log("Image uploaded");
                })
                .catch((error) => {
                    console.log(error);
                }),
                await getDownloadURL(storageRef).then((url) => {
                    this.urlList.push(url);
                    console.log(url);
                });
        },
        // Submit
        async addProduct() {
            const productRef = doc(db, "products", this.product.name);
            this.sizeList.forEach((size) => {
                var e = document.getElementById(size);
                this.product.quantity[size] = e.value;
            });
            this.product.images = this.urlList;
            console.log(this.product.images);
            await setDoc(productRef, this.product).then(() => {
                console.log("Document successfully written!");
                router.push("/");
            });
        },
    },
    components: { NavBar },
};
</script>
