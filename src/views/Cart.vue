<template>
  <NavBar />
  <div class="row mt-5 mx-auto justify-content-center">

    <div class="col-lg-7">
      <div class="card shadow">
        <div class="card-header bg-dark text-white">
          <h4>Your Cart</h4>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="item in products" :key="item.id">
            <div class="row align-items-center">
              <div class="col-3">
                <img :src="item.image" class="img-fluid" alt="product-image">
              </div>
              <div class="col-3">
                {{ item.name }}
                <br>
                Size: {{ item.item_size }}

              </div>
              <div class="col-3">
                <div class="quantity-control">
                  <button class="btn btn-sm btn-outline-dark" @click="decrementQuantity(item)">-</button>
                  <span class="quantity-number">{{ item.quantity }}</span>
                  <button class="btn btn-sm btn-outline-dark" @click="incrementQuantity(item)">+</button>
                </div>
              </div>

              <div class="col-3 text-right quantity">
                <div class="price-section">

                  ${{ item.price * item.quantity | currency }}
                </div>
                <div @click="removeItemFromCart(item)" style="cursor: pointer;">
                  <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="20" height="20"
                    style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd">
                    <!-- Your SVG content here -->
                    <path
                      d="M5.755 20.283 4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717zM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z"
                      style="fill: #650000;" />
                  </svg>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-lg-4 ml-4 summary-card">
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title">Order Summary</h5>
          <hr>
          <p class="card-text">Total: ${{ totalPrice | currency }}</p>
          <hr>

          <button class="btn btn-dark btn-block" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from "../components/NavBar.vue";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase/init.js";
import { onAuthStateChanged } from "firebase/auth";
import router from "../router";
export default {
  components: { NavBar },
  /* For validation of user type??  */
  data() {
    return {
      user_id: localStorage.getItem("user_uid"),
      products: [],

    }
  },

  created() {
    if (!auth.currentUser) {
        // Redirect to the login page
        router.push('/login');
        return;
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User logged in already or has just logged in.
        const userID = user.uid;
        console.log("User ID (UID):", userID);
        // Reference to the user's document
        const userDocRef = doc(db, "users", userID);

        // Listen for changes in the user's document
        onSnapshot(userDocRef, async (userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Access the "cart" field within the user's document
            const cart = userData.cart || [];

            // Initialize the products array
            this.products = [];

            // Loop through the cart and retrieve product data
            for (const cartItem of cart) {
              // Assuming the cart items contain product information

              this.products.push({
                name: cartItem.name,
                price: cartItem.price,
                quantity: cartItem.quantity,
                image: cartItem.image,
                item_size: cartItem.item_size,
              });
              console.log(this.products)
            }
          }
        });
      } else {
        // No user is signed in
        console.log("No user is signed in.");
      }
    });


  },
  computed: {
    totalPrice() {
      return this.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
  },
  methods: {
    async incrementQuantity(item) {
      item.quantity++;
      await this.updateQuantity(item);
    },
    async decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        await this.updateQuantity(item);
      }
    },
    async updateQuantity(item) {
      const userDocRef = doc(db, "users", this.user_id);

      // Filter out items with invalid quantity
      const updatedCart = this.products
        .map((product) => {
          if (product.name === item.name && product.item_size === item.item_size) {
            return {
              ...product,
              quantity: item.quantity,
            };
          }
          return product;
        })
        .filter((product) => product.quantity > 0); // Remove items with quantity less than or equal to 0

      await updateDoc(userDocRef, {
        cart: updatedCart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          item_size: item.item_size,
        })),
      });
    },

    async removeItemFromCart(item) {
      const userDocRef = doc(db, "users", this.user_id);

      // Filter out items based on name and item_size
      const updatedCart = this.products.filter(
        (product) =>
          product.name !== item.name || product.item_size !== item.item_size
      );

      await updateDoc(userDocRef, {
        cart: updatedCart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          item_size: item.item_size,
        })),
      });
    },

    async checkout() {

      // Show a checkout success message using a browser alert
      window.alert("Checkout Successful!");

      // After showing the alert, you can perform additional actions like clearing the cart
      // or updating the order history in your Firestore database.
      // For example, to clear the cart, you can do something like this:
      const userDocRef = doc(db, "users", this.user_id);
      await updateDoc(userDocRef, {
        cart: [],
      });
      this.products = []; // Clear the cart in your Vue component

    },

  },
  filters: {
    currency(value) {
      return '$' + value.toFixed(2);
    }
  },
}

</script>
<!-- Style sheet -->
<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  /* To ensure the border-radius is applied to inner elements */
}

.card-header,
.card-footer {
  background-color: #343a40;
  /* Bootstrap's default dark theme color */
}

.btn-outline-dark,
.btn-outline-danger {
  border-width: 2px;
  font-size: 0.8rem;
  /* Reduced font size for the buttons */
}

.list-group-item {
  border-top-width: 1px !important;
  padding: 1.5rem 1.25rem;
  /* Increase padding for better spacing */
}

.list-group-item:first-child {
  border-top-width: 0 !important;
}

.btn-sm {
  height: 25px;
  /* Reduced height */
  width: 25px;
  /* Reduced width */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.row.align-items-center>div {
  display: flex;
  align-items: center;
  /* Vertically align content in the row */
}

.img-fluid {
  max-height: 80px;
  /* Limit image height */
  width: auto;
}

.quantity {
  justify-content: space-between;
  /* Space out the quantity and price */
}

.quantity .btn {
  margin: 0 0.4rem;
  /* Slight reduction in spacing between the decrement and increment buttons */
}

.remove-icon {
  width: 20px;
  height: 20px;
  margin-left: 1rem;
  /* Space out the delete icon from the price */
  cursor: pointer;
}

.remove-icon path {
  fill: #650000;
}

.quantity-control {
  display: inline-flex;
  align-items: center;
}

.quantity-number {
  margin: 0 0.5rem;
  min-width: 20px;
  text-align: center;
}

.price-section {
  display: flex;
  justify-content: flex-end;
  /* align content to the right */
  align-items: center;
  /* vertically align items */
  margin-bottom: 0.5rem;
  /* some space between price and delete icon */
}

.price-label {
  margin-right: 0.5rem;
  /* spacing between label and price */
  font-weight: 600;
  /* make label slightly bold */
  color: #343a40;
  /* a slightly darker text color for the label */
}

@media (max-width: 991.98px) {
  .summary-card {
    padding-top: 2rem;
    /* Adjust as needed */
  }
}


/* Ensure you've included Font Awesome if you're using the trash icon. */</style>
