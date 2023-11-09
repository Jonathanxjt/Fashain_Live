<template>
    <NavBar />
    <div class="container">
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../assets/carousel/2.png" class="d-block w-100" alt="..." @click="scrollToSection()" />
                </div>
                <div class="carousel-item">
                    <img src="../assets/carousel/3.png" class="d-block w-100" alt="..." @click="scrollToSection()" />
                </div>
                <div class="carousel-item">
                    <img src="../assets/carousel/5.png" class="d-block w-100" alt="..." @click="scrollToSection()" />
                </div>
                <div class="carousel-item" v-for="campaign in this.campaigns" :key="campaign">
                    <img
                        :src="campaign.listOfCampaign[0].campaignImage"
                        class="d-block w-100"
                        alt="..."
                        @click="scrollToSection()" />
                </div>
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="row">
            <div class="col">
                <ul class="nav nav-pills nav-justified mt-5 mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a
                            class="nav-link active"
                            id="ex-with-icons-tab-1"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-new"
                            role="tab"
                            href="#pills-new"
                            aria-controls="pills-new"
                            aria-selected="true"
                            ><i class="fas fa-fire fa-fw me-2"></i>Brand New</a
                        >
                    </li>
                    <li class="nav-item" role="presentation">
                        <a
                            class="nav-link"
                            id="ex-with-icons-tab-2"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-used"
                            href="#pills-used"
                            role="tab"
                            aria-controls="pills-used"
                            aria-selected="false"
                            ><i class="fas fa-heart fa-fw me-2"></i>Pre-loved</a
                        >
                    </li>
                    <li class="nav-item" role="presentation">
                        <a
                            class="nav-link"
                            id="ex-with-icons-tab-3"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-rental"
                            href="#pills-rental"
                            role="tab"
                            aria-controls="pills-rental"
                            aria-selected="false"
                            ><i class="fas fa-truck-moving fa-fw me-2"></i>Rental</a
                        >
                    </li>
                </ul>

                <div class="tab-content" id="pills-tabContent">
                    <div
                        class="tab-pane fade show active"
                        id="pills-new"
                        role="tabpanel"
                        aria-labelledby="pills-new-tab">
                        <div class="container">
                            <div class="row d-flex mb-3 justify-content-center">
                                <a class="btn btn-custom-outline" @click="isSortedByRating = !isSortedByRating">
                                    {{ isSortedByRating ? "Unsort" : "Sort by rating (High - low)" }}
                                </a>
                            </div>
                            <div class="row">
                                <div
                                    class="col mb-3 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center"
                                    v-for="product in this.sortedProducts_new"
                                    :key="product">
                                    <div
                                        class="card"
                                        style="height: auto; width: 250px"
                                        @click="goToProductPage(product)">
                                        <img :src="product.images[0]" class="card-img-top h-100 w-100" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{{ product.name }}</h5>
                                            <h6 class="card-subtitle">{{ product.category }}</h6>
                                            <p class="card-text">
                                                {{ "⭐".repeat(Number(product.rating))
                                                }}{{ "☆".repeat(5 - Number(product.rating)) }}
                                            </p>
                                            <a href="#" class="btn btn-primary">${{ product.price }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show" id="pills-used" role="tabpanel" aria-labelledby="pills-used-tab">
                        <div class="container">
                            <div class="row d-flex mb-3 justify-content-center">
                                <a class="btn btn-custom-outline" @click="isSortedByRating = !isSortedByRating">
                                    {{ isSortedByRating ? "Unsort" : "Sort by rating (High - low)" }}
                                </a>
                            </div>
                            <div class="row">
                                <div
                                    class="col col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3"
                                    v-for="product in this.sortedProducts_used"
                                    :key="product">
                                    <div
                                        style="height: auto; width: 250px"
                                        class="card"
                                        @click="goToProductPage(product)">
                                        <img :src="product.images[0]" class="card-img-top img-fluid" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{{ product.name }}</h5>
                                            <h6 class="card-subtitle">{{ product.category }}</h6>
                                            <p class="card-text">
                                                {{ "⭐".repeat(Number(product.rating))
                                                }}{{ "☆".repeat(5 - Number(product.rating)) }}
                                            </p>
                                            <a href="#" class="btn btn-primary">${{ product.price }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="pills-tabContent">
                    <div
                        class="tab-pane fade show"
                        id="pills-rental"
                        role="tabpanel"
                        aria-labelledby="pills-rental-tab">
                        <!-- For Map -->
                        <GoogleMap :data="storeLocations" @update-data="handleUpdateData" @onChange="nearbyStores"
                            >Hi</GoogleMap
                        >
                        <!-- Map End -->
                        <div class="container py-5">
                            <div class="row">
                                <div
                                    class="col col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3"
                                    v-for="product in this.nearbyStores"
                                    :key="product">
                                    <div
                                        class="card"
                                        style="height: auto; width: 250px"
                                        @click="goToProductPage(product)">
                                        <img :src="product.images[0]" class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{{ product.name }}</h5>
                                            <h6 class="card-subtitle">{{ product.category }}</h6>
                                            <p class="card-text">
                                                {{ "⭐".repeat(Number(product.rating))
                                                }}{{ "☆".repeat(5 - Number(product.rating)) }}
                                            </p>
                                            <a href="#" class="btn btn-primary">${{ product.price }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import GoogleMap from "../components/GoogleMap.vue";
import { collection, where, query, doc, getFirestore, getDocs, setDoc } from "firebase/firestore";

const db = getFirestore();
const q = query(collection(db, "products"));
export default {
    components: { NavBar, GoogleMap },

    data() {
        return {
            products: [],
            products_new: [],
            products_used: [],
            products_rental: [],
            product: "",
            //Map stuff
            map: null,
            infoWindow: null,
            placesService: null,
            currentPos: { lat: 0, lng: 0, dist: 0 }, //To get currentPos without calling function again
            dist: 1000,
            storeLocations: [],
            storesNearby: [],
            isSortedByRating: true,
            campaigns: [],
        };
    },

    name: "Home",

    created() {
        this.fetchProducts()
            .then(() => {
                for (const product of this.products) {
                    this.categorizeProduct(product);
                }

                return this.fetchRating(this.products);
            })
            .then(() => {
                return this.fetchLocations(this.products);
            });
        this.fetchCampaigns();
    },

    methods: {

        scrollToSection() {
            this.$nextTick(() => {
                const element = document.getElementById('pills-tab');
                element.scrollIntoView({ behavior: 'smooth' });
            });
        },

        handleUpdateData({ key, value }) {
            if (value == "No users found") {
                this.storesNearby = [];
                return;
            }
            if (!this.storesNearby.includes(value)) {
                this.storesNearby.push(value);
            }
        },
        async fetchProducts() {
            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        this.products.push(doc.data());
                    });
                } else {
                    console.log("No products found for the given query.");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        async fetchCampaigns() {
            try {
                const q = query(collection(db, "campaigns"));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        this.campaigns.push(doc.data());
                    });
                } else {
                    console.log("No campaigns found for the given query.");
                }
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            }
        },
        async fetchRating(products) {
            try {
                const locationPromises = products.map((product) => {
                    const q = query(collection(db, "users"), where("uid", "==", product.uid));
                    return getDocs(q).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.products.forEach((product) => {
                                if (product.uid == doc.data().uid) {
                                    product.rating = doc.data().rating;
                                }
                            });
                        });
                        // console.log(this.products);
                    });
                });
                // Wait for all the location fetches to complete
                await Promise.all(locationPromises);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        },
        async fetchLocations(products) {
            try {
                const locationPromises = products.map((product) => {
                    const q = query(collection(db, "users"), where("uid", "==", product.uid));
                    return getDocs(q).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const locationData = doc.data();
                            if (!this.storeLocations.some((location) => location.uid === locationData.uid)) {
                                this.storeLocations.push(locationData);
                            }
                        });
                    });
                });
                // Wait for all the location fetches to complete
                await Promise.all(locationPromises);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        },

        categorizeProduct(product) {
            if (product.type == "New") {
                this.products_new.push(product);
            } else if (product.type == "Pre-loved") {
                this.products_used.push(product);
            } else if (product.type == "Rental") {
                this.products_rental.push(product);
            }
        },
        goToProductPage(product) {
            if (product && product.name) {
                this.$router.push({
                    name: "ProductPage",
                    params: { name: product.name },
                });
            } else {
                console.error("Product name is missing or undefined");
            }
        },
    },
    filters: {},

    computed: {
        nearbyStores() {
            //console.log(this.storesNearby);
            return this.products_rental.filter((product) => {
                return this.storesNearby.includes(product.uid);
            });
        },
        sortedProducts_new() {
            if (this.isSortedByRating) {
                // If isSortedByRating is true, return the products sorted by rating
                return [...this.products_new].sort((a, b) => b.rating - a.rating);
            } else {
                // If isSortedByRating is false, return the products in their original order
                return this.products_new;
            }
        },
        sortedProducts_used() {
            if (this.isSortedByRating) {
                // If isSortedByRating is true, return the products sorted by rating
                return [...this.products_used].sort((a, b) => b.rating - a.rating);
            } else {
                // If isSortedByRating is false, return the products in their original order
                return this.products_used;
            }
        },
    },
};
</script>

<style scoped>
.nav-pills {
    background-color: #665c37;
}

.nav-pills .nav-link {
    color: white;
}

.nav-pills .nav-link.active,
.nav-pills .nav-link:focus,
.nav-pills .nav-link:hover .nav-pills .nav-link:active {
    background-color: #bcb393;
    color: black;
}

.btn-primary {
    background-color: #000000;
    border: 1px solid #000000;
    color: #ffffff;
    transition:
        background-color 0.3s,
        border-color 0.3s;
}

.btn-primary:hover {
    background-color: #333333;
    border: 1px solid #333333;
    color: #ffffff;
}

.btn-primary:active,
.btn-primary:focus {
    background-color: #1a1a1a;
    border-color: #1a1a1a;
    color: #ffffff;
    box-shadow: none;
}
.btn-custom-outline {
    background-color: #665c37;
    color: white;
    border: 1px solid #665c37;
}
</style>
