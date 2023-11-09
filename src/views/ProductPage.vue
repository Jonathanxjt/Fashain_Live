<template>
    <div class="product-page">
        <NavBar />

        <div class="container mt-5">
            <div class="row">
                <div class="col-md-6 product-image-section" >
                    <!-- Thumbnails -->
                    <div class="thumbnails">
                        <img 
                            v-for="(image, index) in product.images" 
                            :key="index" 
                            :src="image" 
                            @click="setCurrentImage(image)"
                            class="thumbnail-img"
                            :class="{ 'active-thumbnail': image === currentImage }"
                            alt="Thumbnail Image"
                        />
                    </div>
                
                    <!-- Main Product Image -->
                    <img :src="currentImage" class="product-img" alt="Product Image" />
                </div>
                <div class="col-md-6 product-details-section">
                     <!-- Toggle button to switch between map and product details -->
                    <button @click="toggleView" class="btn btn-secondary mb-3">
                        {{ showMap ? 'Show Product Details' : 'Show Store Location' }}
                    </button>

                    <!-- Displaying the product details -->
                    <div v-if="!showMap">
                        <h2 class="product-name">{{ product.name }}</h2>
                        <p class="product-description">{{ product.description }}</p>
                        <p class="product-category"><strong>Category:</strong> {{ product.category }}</p>
                        <p class="product-price">${{ product.price }}</p>
                        <!-- size selection -->
                        <div class="size-selection">
                            <button 
                                v-for="size in Object.keys(product.quantity)" 
                                :key="size" 
                                class="size-btn"
                                :class="{ 'active': size === selectedSize }" 
                                @click="selectedSize = size">
                                {{ size }}
                            </button>
                            <!-- Add the following line for the prompt -->
                            <div v-if="!selectedSize" class="select-size-prompt" :style="{ visibility: !selectedSize ? 'visible' : 'hidden' }">
                                Please select a size before adding to cart.
                            </div>
                        </div>
                        <!-- Add to cart button -->
                        <button @click="addToCart" :disabled="!canAddToCart()" class="cart-btn btn btn-secondary">Add to Cart</button>
                        <div v-if="showAddedMessage" class="added-to-cart-message">Added to Cart</div>
                    </div>
                    <!-- Displaying the map -->
                    <div v-else>
                        <div id="map" style="width: 100%; height: 300px;"></div>
                        <div class="user-details-section">
                            <h3>{{ username }}</h3>
                            <p><strong>Email: </strong><a :href="'mailto:' + email">{{ email }}</a></p>
                            <p><strong>Contact Number: </strong>{{ contactno }}</p>
                            <p class="address"><strong>Address: </strong>{{ street_number }} {{ route }}, {{ postal_code }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, query, where, getFirestore, getDocs, doc, getDoc, updateDoc} from "firebase/firestore";
import NavBar from "../components/NavBar.vue";
import { auth } from '../firebase/init.js';
import router from "../router";

const db = getFirestore();

export default {
    components: { NavBar },
    data() {
        return {
            product: {},
            lat: null,
            long: null,
            username: null,
            email: null,
            contactno: null,
            street_number: null,
            route: null,
            postal_code: null,
            buyerid: localStorage.getItem("user_uid"),
            showMap: false,
            showAddedMessage: false,
            selectedSize: null,
            currentImage: null,
            
        };
    },
    props: {
        name: {
            type: String,
            required: true
        }
    },
    name: "ProductPage",

    created() {
        if (!this.name) {
            console.error("Product name is missing");
            return;
        }
        console.log("Product name:", this.name);
        this.fetchProductDetails().catch(error => {
            console.error("Failed to fetch product details:", error);
        });

    },

    watch: {
        showMap(newVal) {
            if (newVal) {
                this.initializeMap();
            }
        },

        product: {
            deep: true,
            handler(newValue) {
                // Set the currentImage to the first image in the array when the product data changes.
                if (newValue.images && newValue.images.length > 0) {
                    this.currentImage = newValue.images[0];
                }
            }
        }

    },

    methods: {
        async fetchProductDetails() {
            const q = query(collection(db, "products"), where("name", "==", this.name));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                this.product = querySnapshot.docs[0].data();
                console.log("Fetched product details:", this.product);
                this.fetchAddress()
            } else {
                console.warn("No product found for the given UID");
            }
        },

        async fetchAddress() {
            const q = query(collection(db, "users"), where("uid", "==", this.product.uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                this.lat = querySnapshot.docs[0].data().address.latitude;
                this.long = querySnapshot.docs[0].data().address.longitude;
                this.username = querySnapshot.docs[0].data().name;
                this.email = querySnapshot.docs[0].data().email;
                this.contactno = querySnapshot.docs[0].data().contactno;
                this.street_number = querySnapshot.docs[0].data().address.street_number;
                this.route = querySnapshot.docs[0].data().address.route;
                this.postal_code = querySnapshot.docs[0].data().address.postal_code;
                // console.log("Fetched user address:", this.lat, this.long, this.username, this.email, this.contactno, this.street_number, this.route, this.postal_code);
            } else {
                console.warn("No address found");
            }
        },

        toggleView() {
            this.showMap = !this.showMap;
        },

        initializeMap() {
            if (!this.lat || !this.long) return;
            this.$nextTick(() => {
                const map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: this.lat, lng: this.long },
                    zoom: 15
                });

                const marker = new google.maps.Marker({
                    position: { lat: this.lat, lng: this.long },
                    map: map
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: "Click for directions"
                });

                infoWindow.open(map, marker);

                marker.addListener('click', () => {
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.lat},${this.long}`;
                    window.open(directionsUrl, '_blank');
                });
            });
        },

        async addToCart() {
            
            if (!auth.currentUser) {
        // Redirect to the login page
        router.push('/login');
        return; // Stop execution of this function
      }
            const userRef = doc(db, "users", this.buyerid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const cartItems = userData.cart || [];
                const existingCartItemIndex = cartItems.findIndex(item => item.name === this.product.name && item.item_size === this.selectedSize);


                if (existingCartItemIndex !== -1) {
                    cartItems[existingCartItemIndex].quantity += 1;
                } else {
                    cartItems.push({
                        image: this.product.images[0],
                        price: this.product.price,
                        name: this.product.name,
                        item_size: this.selectedSize,
                        quantity: 1

                    });
                }
                
                await updateDoc(userRef, { cart: cartItems });
                this.isInCart = true;
                this.showAddedMessage = true;
                setTimeout(() => {
                    this.showAddedMessage = false;
                }, 2000);

            } else {
                console.error('User not found!');
            }
        },

        canAddToCart() {
            return this.selectedSize !== null;
        },

        setCurrentImage(image) {
            this.currentImage = image;
        },



    }

};
</script>


<style scoped>
    .product-page {
        background-color: #f7f7f7;
        padding-bottom: 100px;
    }

    .product-image-section {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .product-details-section {
        padding: 40px;
        background-color: #ffffff;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        position: relative;
    }

    #map {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
        margin: 20px 0; 
    }

    .product-img {
        max-width: 70%; 
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .product-name {
        font-size: 2.5em;
        margin-bottom: 20px;
        color: #333;
    }

    .product-category {
        font-size: 1.2em;
        margin-bottom: 15px;
        color: #555;
    }

    .product-description {
        margin-bottom: 30px;
        font-size: 1.15em;
        color: #666;
        line-height: 1.5;
    }

    .product-price {
        font-size: 2em;
        color: #444;
        margin-bottom: 40px;
    }

    .size-selection {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }
    
    .size-btn {
        margin-right: 10px;
        padding: 5px 15px; 
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: #f5f5f5; 
        width: 60px; 
        text-align: center;
        
        &:hover {
            background-color: #b0b0b0; 
        }
    }
    
    .user-details-section {
        margin-top: 20px;
        padding: 20px;
        background-color: #f9f9f9;  
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    }
    
    .user-details-section h3 {
        font-size: 1.5em;
        margin-bottom: 10px;
        color: #333;
    }
    
    .user-details-section p {
        margin-bottom: 8px;
        font-size: 1.1em;
        color: #555;
    }
    
    .user-details-section a {
        color: #007bff;
        text-decoration: none;
    }
    
    .user-details-section a:hover {
        text-decoration: underline;
    }

    .user-details-section p.address {
        margin-top: 10px;
        font-size: 1.1em;
        color: #4a4a4a;
    }

    .added-to-cart-message {
        color: goldenrod;
        font-weight: bold;
        margin-top: 10px;
        transition: opacity 0.5s;
        display: inline-block;
        padding-left: 1%;
        position: absolute;
    }

    .size-btn.active {
        background-color: #b0b0b0; 
    }

    .select-size-prompt {
        color: black;
        font-weight: bold;
        visibility: hidden;
    }
    
    .cart-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .product-image-section {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 20px;
    }
    
    .thumbnails {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
        
    }
    
    .thumbnail-img {
        margin-bottom: 10px; 
        cursor: pointer;
        width: 60px; 
        height: 80px; 
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        transition: border 0.3s ease;

    }
    
    .thumbnail-img.active-thumbnail {
        border: 2px solid grey; 
    }
</style>
