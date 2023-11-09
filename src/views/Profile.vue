<template>
    <NavBar />
    <!-- <link href="https://netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"> -->

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

    <!-- User profile -->

    <!-- Business Profile-->

    <div class="container py-5">
        <div class="row">
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <h5 class="my-3">{{ user.name }}</h5>
                        <img :src="user.image" class="rounded-circle img-fluid" style="width: 150px;height:150px" />
                        <h5 class="my-3">{{ user.name }}</h5>
                        <p class="text-muted mb-1">{{ user.email }}</p>
                        <p v-if="user.userType == 'business'" class="text-muted mb-4">Sustainability Rating: {{ rating }}</p>
                        <a class="btn btn-custom-outline btn-sm" href="/edit_profile">Edit Profile
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                viewBox="0 2 24 24">
                                <path
                                    d="M20.548 3.452a1.542 1.542 0 0 1 0 2.182l-7.636 7.636-3.273 1.091 1.091-3.273 7.636-7.636a1.542 1.542 0 0 1 2.182 0zM4 21h15a1 1 0 0 0 1-1v-8a1 1 0 0 0-2 0v7H5V6h7a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1z" />
                            </svg>
                        </a>

                        <ul class="list-group list-group-flush rounded-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path
                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0 -6 3 3 0 0 0 0 6z" />
                                </svg>
                                <p class="mb-0">
                                    {{
                                        `${user.address.street_number} ${user.address.route}, ${user.blockNumber},
                                                                        ${user.address.postal_code}`
                                    }}
                                </p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-telephone" viewBox="0 0 16 16">
                                    <path
                                        d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                                <p class="mb-0">{{ user.contactno }}</p>
                            </li>
                            <li v-if="user.userType == 'business'" class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                                    viewBox="6 0 64 64" xml:space="preserve" style="
                                        fill-rule: evenodd;
                                        clip-rule: evenodd;
                                        stroke-linecap: round;
                                        stroke-linejoin: round;
                                        stroke-miterlimit: 2;
                                    ">
                                    <path
                                        d="M16 36v4.642a2.091 2.091 0 0 0 2.545 2.041l29.819-6.64A2.09 2.09 0 0 0 50 34.002v-8.004c0-.98-.68-1.828-1.636-2.041l-29.819-6.64A2.092 2.092 0 0 0 16 19.358V22.5"
                                        style="fill: none; stroke: #222a33; stroke-width: 3px" />
                                    <path
                                        d="M8.069 28.044A1.387 1.387 0 0 1 9.1 26.257c1.933-.352 5.458-.621 8.548 1.164 3.091 1.784 4.621 4.971 5.282 6.821a1.387 1.387 0 0 1-1.032 1.787c-1.933.352-5.457.621-8.548-1.163-3.09-1.785-4.62-4.972-5.281-6.822zM23.154 35.535c.165.285.443.487.766.555 1.619.295 4.572.52 7.16-.975 2.589-1.494 3.87-4.164 4.424-5.713a1.16 1.16 0 0 0-.864-1.497c-1.619-.295-4.571-.52-7.16.974a8.406 8.406 0 0 0-1.594 1.199M23.011 35.402l-8.413-4.871M50 35.046c0 .518.206 1.015.572 1.382.367.366.864.572 1.382.572h2.751C55.42 37 56 36.42 56 35.705v-11.41C56 23.58 55.42 23 54.705 23h-2.751M51 37l1.723 13.787A1.97 1.97 0 0 1 50.769 53h-8.41a1.97 1.97 0 0 1-1.937-2.321L42 42M46 30v.001a3.073 3.073 0 0 1-1.824 2.808L41.5 34"
                                        style="fill: none; stroke: #222a33; stroke-width: 3px" />
                                </svg>
                                <p class="mb-0">Campaigns: {{ user.campaignsCount }}</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-center">
                                <a v-if="user.userType == 'business'" @click="toggleModal"
                                    class="btn btn-custom-outline btn-sm">Organise Upcycling
                                    Drive</a>

                                <!-- Modal -->
                                <div v-if="showModal" class="modal" tabindex="-1" role="dialog" style="display: block;">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Upcycling Drive Form</h5>
                                                <button type="button" class="close" @click="toggleModal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form @submit.prevent="submitForm">
                                                    <div class="form-group">
                                                        <label for="startDate">Start Date:</label>
                                                        <input type="date" id="startDate" class="form-control"
                                                            v-model="form.startDate" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="endDate">End Date:</label>
                                                        <input type="date" id="endDate" class="form-control"
                                                            v-model="form.endDate" required>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-outline-danger"
                                                            @click="toggleModal">Close</button>
                                                        <button type="submit" class="btn btn-custom-outline">Launch
                                                            Drive</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </li>


                        </ul>
                    </div>
                </div>
                <div class="card mb-4 mb-lg-0">
                    <div class="card-body p-0"></div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card mb-0">
                    <!-- 
                        Tabs for businesses products, campaigns
                     -->
                    <div v-if="user.userType == 'business'">
                        <!-- <div v-if="user.userType == 'business'"> -->
                        <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist" style="border-radius: 5px">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                    aria-selected="true"
                                    style="min-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color:white" @click="fetchData">
                                    All Products
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-new-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-new" type="button" role="tab" aria-controls="pills-new"
                                    aria-selected="false" style="color: white" @click="fetchData" >
                                    New
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-used-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-used" type="button" role="tab" aria-controls="pills-used"
                                    aria-selected="false" style="color: white" @click="fetchData">
                                    Used
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-rental-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-rental" type="button" role="tab" aria-controls="pills-rental"
                                    aria-selected="false" style="color: white" @click="fetchData">
                                    Rental
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-campaign-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-campaign" type="button" role="tab" aria-controls="pills-campaign"
                                    aria-selected="false" style="color: white" @click="fetchData">
                                    Campaign
                                </button>
                            </li>
                        </ul>
                        <!-- All products -->
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                                aria-labelledby="pills-home-tab">
                                <div class="row me-2 ms-2 mt-2 justify-content-start">
                                    <div class="col-md-4 col-lg-4 col-xl-4 mb-3 d-flex" v-for="(product, index) in products"
                                        :key="index">
                                        <div class="card text-black flex-fill">
                                            <img :src="product.images[0]" class="card-img-top w-100" :alt="product.name" />
                                            <div class="card-body">
                                                <div class="text-center mt-1">
                                                    <h4 class="card-title" style="font-size: large">
                                                        {{ product.name }}
                                                    </h4>
                                                    <p class="card-text">
                                                        <strong>Category:</strong> {{ product.category }}<br />
                                                        <strong>Price:</strong> ${{ product.price }}
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="card-footer d-flex flex-row mb-0">

                                                <button @click="deleteProduct(index, products)" type="button"
                                                    class="btn btn-custom-outline-danger flex-fill ms-1">
                                                    <span class="button-label">Delete</span>
                                                    <span class="button-x">x</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row">

                                    <a v-if="user.userType == 'business'" class="btn btn-custom-outline flex-fill me-1"
                                        href="/add_product">Add Product</a>
                                    
                                </div>
                            </div>
                            <!-- New products -->
                            <div class="tab-pane fade" id="pills-new" role="tabpanel" aria-labelledby="pills-new-tab">
                                <div class="row me-2 ms-2 mt-2 justify-content-start">
                                    <div class="col-md-4 col-lg-4 col-xl-4 mb-3 d-flex"
                                        v-for="(product, index) in products_new" :key="index">
                                        <div class="card text-black flex-fill">
                                            <img :src="product.images[0]" class="card-img-top w-100" :alt="product.name" />
                                            <div class="card-body">
                                                <div class="text-center mt-1">
                                                    <h4 class="card-title" style="font-size: large">
                                                        {{ product.name }}
                                                    </h4>
                                                    <p class="card-text">
                                                        <strong>Category:</strong> {{ product.category }}<br />
                                                        <strong>Price:</strong> ${{ product.price }}
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="card-footer d-flex flex-row mb-0">

                                                <button @click="deleteProduct(index, products_new)" type="button"
                                                    class="btn btn-custom-outline-danger flex-fill ms-1">
                                                    <span class="button-label">Delete</span>
                                                    <span class="button-x">x</span>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row">

                                    <a v-if="user.userType == 'business'" class="btn btn-custom-outline flex-fill me-1"
                                        href="/add_product">Add Product</a>
                              
                                </div>
                            </div>
                            <!-- used -->
                            <div class="tab-pane fade" id="pills-used" role="tabpanel" aria-labelledby="pills-used-tab">
                                <div class="row me-2 ms-2 mt-2 justify-content-start">
                                    <div class="col-md-4 col-lg-4 col-xl-4 mb-3 d-flex"
                                        v-for="(product, index) in products_used" :key="index">
                                        <div class="card text-black flex-fill">
                                            <img :src="product.images[0]" class="card-img-top w-100" :alt="product.name" />
                                            <div class="card-body">
                                                <div class="text-center mt-1">
                                                    <h4 class="card-title" style="font-size: large">
                                                        {{ product.name }}
                                                    </h4>
                                                    <p class="card-text">
                                                        <strong>Category:</strong> {{ product.category }}<br />
                                                        <strong>Price:</strong> ${{ product.price }}
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="card-footer d-flex flex-row mb-0">

                                                <button @click="deleteProduct(index, products_used)" type="button"
                                                    class="btn btn-custom-outline-danger flex-fill ms-1">
                                                    <span class="button-label">Delete</span>
                                                    <span class="button-x">x</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row">

                                    <a v-if="user.userType == 'business'" class="btn btn-custom-outline flex-fill me-1"
                                        href="/add_product">Add Product</a>
                                
                                </div>
                            </div>
                            <!-- Rental -->
                            <div class="tab-pane fade" id="pills-rental" role="tabpanel" aria-labelledby="pills-rental-tab">
                                <div class="row me-2 ms-2 mt-2 justify-content-start">
                                    <div class="col-md-4 col-lg-4 col-xl-4 mb-3 d-flex"
                                        v-for="(product, index) in products_rental" :key="index">
                                        <div class="card text-black flex-fill">
                                            <img :src="product.images[0]" class="card-img-top w-100" :alt="product.name" />
                                            <div class="card-body">
                                                <div class="text-center mt-1">
                                                    <h4 class="card-title" style="font-size: large">
                                                        {{ product.name }}
                                                    </h4>
                                                    <p class="card-text">
                                                        <strong>Category:</strong> {{ product.category }}<br />
                                                        <strong>Price:</strong> ${{ product.price }}
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="card-footer d-flex flex-row mb-0">

                                                <button @click="deleteProduct(index, products_rental)" type="button"
                                                    class="btn btn-custom-outline-danger flex-fill ms-1">
                                                    <span class="button-label">Delete</span>
                                                    <span class="button-x">x</span>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row">

                                    <a v-if="user.userType == 'business'" class="btn btn-custom-outline flex-fill me-1"
                                        href="/add_product">Add Product</a>
                               
                                </div>

                            </div>
                            <!-- Campagins -->
                            <div class="tab-pane fade" id="pills-campaign" role="tabpanel"
                                aria-labelledby="pills-campaign-tab">
                                <div class="card mb-3 mx-2 mt-2" v-for="(campaign, index) in campaigns" :key="index">
                                    <div class="image-container">
                                        <img class="card-img-top" :src="campaign.campaignImage" alt="Campaign Image"
                                            style="max-height: 200px; object-fit: contain" />
                                    </div>
                                    <div class="card-body">
                                        <h4 class="card-title">{{ campaign.campaignName }}</h4>
                                        <p class="card-text">{{ campaign.campaignDesc }}</p>
                                        <p class="card-text">
                                            <small class="text-muted">Campaign Start Date: {{ campaign.campaignStartDate
                                            }}</small>
                                            <br />
                                            <small class="text-muted">Campaign End Date: {{ campaign.campaignEndDate
                                            }}</small>
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">Campaign Address: {{ campaign.campaignAddress
                                            }}</small>
                                        </p>
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex flex-row">

                                    <a v-if="user.userType == 'business'" class="btn btn-custom-outline flex-fill me-1"
                                        href="/campaign">Create Campaign</a>
                               
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="tab-pane fade" id="pills-new" role="tabpanel" aria-labelledby="pills-new-tab">new</div>
    <div class="tab-pane fade" id="pills-used" role="tabpanel" aria-labelledby="pills-used-tab">te1st</div>
    <div class="tab-pane fade" id="pills-rental" role="tabpanel" aria-labelledby="pills-rental-tab">test</div>
    <div class="tab-pane fade" id="pills-campaign" role="tabpanel" aria-labelledby="pills-campaign-tab">...</div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, onSnapshot, setDoc, Timestamp, deleteDoc} from "firebase/firestore";
import { auth } from "../firebase/init.js";
import { watch } from "vue";
import router from "../router";
const db = getFirestore();

export default {
    components: { NavBar },
    name: "Profile",
    /* For validation of user type??  */
    data() {
        return {
            /*
            --- Customer ---
            userType: "user",
            --- Business ---
            userType: "business",
            just to pull
            
            */

            user: {
                uid: localStorage.getItem("user_uid"),
                name: "",
                email: "",
                userType: "",
                address: "",
                postcode: "",
                blockNumber: "",
                contactno: "",
                rating: "",
                image: "",
                // joindate: null, // Initialize joindate as null
                campaignsCount: 0, // Add a property to store the campaign count
                documentID: "",
            },
            campaigns: [],
            products: [],
            products_new: [],
            products_used: [],
            products_rental: [],

            // upcycling
            showModal: false,
            form: {
                startDate: '',
                endDate: ''
            }
        };
    },
    // sLMohi7AUYxO8Xw45FRh
    created() {
        const q = query(collection(db, "users"), where("uid", "==", this.user.uid));
        // Data collection of campaigns
        const campaignsDocRef = doc(db, "campaigns", this.user.uid);

        onSnapshot(campaignsDocRef, async (campaignsDoc) => {
            if (campaignsDoc.exists()) {
                const campaignData = campaignsDoc.data();
                const camps = campaignData.listOfCampaign || [];
                this.campaigns = [];
                for (const campItem of camps) {
                    this.campaigns.push({
                        campaignAddress: campItem.campaignAddress,
                        campaignDesc: campItem.campaignDesc,
                        campaignEndDate: campItem.campaignEndDate,
                        campaignImage: campItem.campaignImage,
                        campaignName: campItem.campaignName,
                        campaignStartDate: campItem.campaignStartDate,
                    });
                    this.user.campaignsCount = this.campaigns.length;
                    console.log("test");
                    console.log(this.campaigns);
                }
            }
        });
        // bok yan i modify the doc name as it clashes with the function
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((user_details) => {
                console.log(user_details.id);
                this.user.documentID = user_details.id;
                this.user.name = user_details.data().name;
                this.user.email = user_details.data().email;
                this.user.userType = user_details.data().userType;
                this.user.address = user_details.data().address;
                this.user.postcode = user_details.data().postcode;
                this.user.blockNumber = user_details.data().blockNumber;
                this.user.contactno = user_details.data().contactno;
                this.user.rating = user_details.data().rating;
                this.user.image = user_details.data().image;
                //this.user.joindate = user_details.data().joindate.toDate();
                console.log(this.user.documentID);
            });
        });
        const pq = query(collection(db, "products"), where("uid", "==", this.user.uid));
        getDocs(pq).then((pqSnapshot) => {
            pqSnapshot.forEach((product_details) => {
                this.products.push(product_details.data());
            });
        });

        const productData = this.products;

        watch(
            () => productData.length,
            () => {
                productData.forEach((product) => {
                    console.log(product);
                    if (product.type == "New") {
                        this.products_new.push(product);
                    } else if (product.type == "Pre-loved") {
                        this.products_used.push(product);
                    } else if (product.type == "Rental") {
                        this.products_rental.push(product);
                    }
                });
            }
        );
    },
    computed: {
        // To display stars
        rating() {
            let x = "⭐";
            return x.repeat(Number(this.user.rating));
        },
    },
    methods: {
        async fetchData() {
        // Clear previous data before fetching new data
        this.products = [];
        this.products_new = [];
        this.products_used = [];
        this.products_rental = [];

        // Fetching data from Firestore
        const pq = query(collection(db, "products"), where("uid", "==", this.user.uid));
        const pqSnapshot = await getDocs(pq);
        
        // Process fetched data
        pqSnapshot.forEach((doc) => {
            const product = doc.data();
            this.products.push(product);

            // Categorize product by type
            if (product.type === "New") {
                this.products_new.push(product);
            } else if (product.type === "Pre-loved") {
                this.products_used.push(product);
            } else if (product.type === "Rental") {
                this.products_rental.push(product);
            }
        });
    },
        async deleteProduct(index, array) {
        // Check if the product has an id
        const product = array[index]

        // First, let's delete from Firestore
        try {
            await deleteDoc(doc(db, "products", product.name)); // Make sure the 'products' path is correct
            console.log('Product deleted from database with ID:', product.name);
        } catch (error) {
            console.error("Error removing product from database:", error);
            return;
        }

        // Now remove from local array
        array.splice(index, 1); // Remove the product from the local state array
        console.log('Product removed from local array');
    },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        async submitForm() {
            try {
                const docRef = collection(db, 'upcycling');


                // Create a new document with a unique ID based on the user's UID
                const docData = {
                    startdate: this.form.startDate ? Timestamp.fromDate(new Date(this.form.startDate)) : null,
                    enddate: this.form.endDate ? Timestamp.fromDate(new Date(this.form.endDate)) : null
                };

                const docId = this.user.uid; // Document ID is based on the user's UID

                // Set the document data using doc() and set() functions
                await setDoc(doc(docRef, docId), docData);

                console.log('Document written with ID: ', docId);
                this.toggleModal(); // close the modal on submit
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }


    },
};
</script>
<!-- Style sheet -->
<style>@import "../assets/profile.css";</style>
