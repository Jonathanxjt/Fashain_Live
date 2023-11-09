<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 col-lg-6 col-xl-6">
                <div>
                    <!-- To filter based on distance -->
                    <p class="row justify-content-center">Showing stores within {{ dist }}km</p>
                    <div class="row d-flex justify-content-center">
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-success col-2" @click="increaseDistance()">Add</button>
                            <input class="form-control col-2 align-content-center" v-model="dist" />
                            <button class="btn btn-outline-success col-2" @click="decreaseDistance()">
                                Minus
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Card component -->
                <div class="card">
                    <div class="card-body">
                        <!-- Card body with padding -->
                        <div id="map" class="w-500"></div>
                        <!-- Map container -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { collection, where, query, doc, getFirestore, getDocs, setDoc } from "firebase/firestore";
import { toRaw } from "vue";
const { encoding } = await google.maps.importLibrary("geometry");
const { spherical } = await google.maps.importLibrary("geometry");
const db = getFirestore();
const q = query(collection(db, "users")); //Subcollection of users object

export default {
    props: ["data"],
    data() {
        return {
            map: null,
            infoWindow: null,
            placesService: null,
            currentPos: { lat: 0, lng: 0, dist: 0 }, //To get currentPos without calling function again
            dist: 1,
            markers: [],
        };
    },

    /**
     * Load the Google Maps JavaScript SDK when the component is mounted.
     *
     * @param {}
     * @return {}
     */
    mounted() {
        // Load the Google Maps JavaScript SDK when the component is mounted
        this.loadGoogleMapsScript();
    },
    watch: {
        dist() {
            this.refreshMap();
        },
    },

    methods: {
        /**
         * Refreshes the map by creating a new map instance with custom styling,
         * setting the initial center of the map, adding an info window to the
         * current position, and finding nearby places.
         *
         * @return {void} This function does not return anything.
         */
        refreshMap() {
            const customMapStyle = [
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#444444" }],
                },
            ];
            this.map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                styles: customMapStyle,
                mapTypeControl: false,
            });
            // Create a new InfoWindow object
            this.infoWindow = new google.maps.InfoWindow();

            // Create a new PlacesService object
            this.placesService = new google.maps.places.PlacesService(this.map);

            // Set the position of the InfoWindow to the current position
            let pos = { lat: this.currentPos.lat, lng: this.currentPos.lng };
            this.infoWindow.setPosition(pos);

            // Set the content of the InfoWindow to "Current Location"
            this.infoWindow.setContent("Current Location");

            // Open the InfoWindow on the map
            this.infoWindow.open(this.map);

            // Set the center of the map to the current position
            this.map.setCenter(pos);

            // Find nearby places using the current position
            this.findNearbyPlaces(this.currentPos);
        },

        increaseDistance() {
            this.dist = Number(this.dist) + 1;
        },
        
        decreaseDistance() {
            if (this.dist > 1) {
                this.dist = Number(this.dist) - 1;
            }
        },

        /**
         * Updates the data with the specified key-value pair.
         *
         * @param {string} key - The key to update.
         * @param {any} value - The value to update.
         * @return {void} This function does not return anything.
         */
        updateData(key, value) {
            this.$emit("update-data", { key, value });
        },

        // Method to load the Google Maps JavaScript SDK dynamically
        loadGoogleMapsScript() {
            console.log("loading");
            // Check if the Google Maps SDK is already loaded
            if (typeof google === "undefined") {
                // If the Google Maps SDK is not loaded, set the global `initMap` function to the `initMap` method of this component
                // We bind it to the current Vue component's context to make sure it has access to component's data, methods, etc.
                window.initMap = this.initMap.bind(this);

                // Create a script element for the Google Maps API
                const mapsScript = document.createElement("script");

                // Set the source URL for the Google Maps API
                mapsScript.src =
                    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDA9Lr5Q_orxHic9yRrScWEU6P6OQM_mjI&libraries=geometry&callback=initMap";

                // Set the script to load asynchronously
                mapsScript.async = true;

                // Append the script element to the document head
                document.head.appendChild(mapsScript);
            } else {
                // If the Google Maps SDK is already loaded, directly initialize the map
                this.initMap();
            }
        },

        /**
         * Initializes the map and sets up the necessary components and configurations.
         *
         * @return {Promise<void>} A promise that resolves when the map is successfully initialized.
         */
        async initMap() {
            const { encoding } = await google.maps.importLibrary("geometry");
            const { spherical } = await google.maps.importLibrary("geometry");
            // Define custom map style
            const customMapStyle = [
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#444444" }],
                },
            ];

            // Create a new map instance
            this.map = new google.maps.Map(document.getElementById("map"), {
                // Set the initial center of the map
                // center: { lat: 1.304833, lng: 103.831833 },
                zoom: 15,
                styles: customMapStyle,
                mapTypeControl: false,
            });

            // Create an info window
            this.infoWindow = new google.maps.InfoWindow();

            // Create a places service
            this.placesService = new google.maps.places.PlacesService(this.map);

            // Check if geolocation is available
            if (navigator.geolocation) {
                // Get the current position
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Extract latitude and longitude from the position
                        const { latitude, longitude } = position.coords;
                        const pos = { lat: latitude, lng: longitude };
                        this.currentPos = pos;

                        // Set the position of the info window
                        this.infoWindow.setPosition(pos);

                        // Set the content of the info window
                        this.infoWindow.setContent("Current Location");

                        // Open the info window on the map
                        this.infoWindow.open(this.map);

                        // Set the center of the map to the current position
                        this.map.setCenter(pos);

                        // Find nearby places
                        this.findNearbyPlaces(pos);
                    },
                    () => {
                        // Handle location error
                        handleLocationError(true, this.infoWindow, this.map.getCenter());
                    }
                );
            } else {
                // Handle location error
                handleLocationError(false, this.infoWindow, this.map.getCenter());
            }
        },

        /**
         * Calculates the Haversine distance between the current position and a given location.
         *
         * @param {Object} locObj - The location object containing latitude and longitude.
         * @return {number} The calculated distance between the two locations.
         */
        haversine_distance(locObj) {
            setTimeout(250);
            let origin = new google.maps.LatLng({
                lat: this.currentPos.lat,
                lng: this.currentPos.lng,
            });
            // Create a new LatLng object for the destination coordinates
            let destination = new google.maps.LatLng({ lat: locObj.lat, lng: locObj.lng });
            // Calculate the distance between the origin and destination using the spherical geometry library
            const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
            // Return the distance
            return distance;
        },

        /**
         * Find nearby places based on the given location.
         *
         * @param {Object} location - The location object.
         * @return {undefined} This function does not return a value.
         */
        async findNearbyPlaces(location) {
            console.log("Inside FindNearbyPlaces");
            const request = {
                location: location,
                radius: 1000,
                type: "clothing_store",
            };
            let arrayOfData = []; //Store array of Loc Object
            let markerArray = [];
            let users = [];

            //Empty out array
            arrayOfData.splice(0);
            markerArray.splice(0);
            users.splice(0);
            if (this.markers.length > 0) {
                this.markers.splice(0);
            }

            // Retrieve documents from users subcollection
            getDocs(q).then((querySnapshot) => {
                // Iterate over each document in the query snapshot
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    // Add the retrieved data to the users array
                    users.push(data);
                });
            });
            console.log("Hi getting list of users");
            console.log(users);

            for (const user of this.data) {
                var locName = {
                    lat: user.address.latitude,
                    lng: user.address.longitude,
                    dist: 0,
                    uid: user.uid,
                };
                // Calculate distance using haversine formula
                const returnDist = this.haversine_distance(locName);
                locName.dist = returnDist.toFixed(2);
                // Add the location to the arrayOfData array
                arrayOfData.push(locName);
            }
            //console.log(arrayOfData);
            // Iterate over each location in the arrayOfData array
            for (const loc of arrayOfData) {
                // console.log(loc.dist, this.dist);
                if (loc.dist <= Number(this.dist * 1000)) {
                    // Add the location to the markerArray array
                    this.updateData("uid", loc.uid);
                    // console.log("added");
                    markerArray.push(loc);
                }
            }
            if (markerArray.length == 0) {
                this.updateData("uid", "No users found");
            }
            // Call the makeMarker function with the markerArray
            this.makeMarker(markerArray);

            //Idk wtf is this dont touch

            // const apiKey = 'AIzaSyDA9Lr5Q_orxHic9yRrScWEU6P6OQM_mjI';
            // // Map each address to a geocoding API request URL
            // const apiUrls = data.map(address => {

            //   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBAXj3w94Ny-9Kylm1nrFCJtPki8B1dMfk`;
            //   return axios.get(apiUrl);
            // });

            // // Wait for all API requests to complete
            // Promise.all(apiUrls)
            //   .then(responses => {
            //     // Extract latitude, longitude, and distance from each response
            //     arrayOfData = responses.map(response => {
            //       const { lat, lng } = response.data.results[0].geometry.location;
            //       var locName = {
            //         lat: lat,
            //         lng: lng,
            //         dist: 0
            //       };

            //       // Calculate distance using haversine formula
            //       const returnDist = this.haversine_distance(locName);
            //       locName.dist = returnDist.toFixed(2);

            //       return locName;
            //     });

            //     // Filter and process data within a certain distance
            //     for (let i = 0; i < arrayOfData.length; i++) {
            //       if (arrayOfData[i].dist < this.dist) {
            //         //Add into array
            //         markerArray.push(arrayOfData[i]);
            //         // Create marker
            //         // console.log(arrayOfData[i]);
            //         // this.makeMarker(arrayOfData[i]);
            //       }
            //     }
            //     // console.log('Am i pushing');
            //     console.log(this.markerArray);
            //     //Loop through a array to add to map marker
            //     this.makeMarker(markerArray);
            //   })
            //   .catch(error => {
            //     console.log(error.message);
            //   });

            //Alter this part, go to firestore retrieve the list of locations and use the axios.get to get the lat and long values
            // Iterate through the data array
            // for (let i = 0; i < data.length; i++) {
            //   const address = data[i];
            //   const apiKey = 'AIzaSyBgzMSEPxutQDRMWM5W9O83UR8cLMmocaE';
            //   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

            //   axios.get(apiUrl)
            //     .then((response) => {
            //       const { lat, lng } = response.data.results[0].geometry.location;
            //       const locName = {
            //         lat: lat,
            //         lng: lng,
            //         dist: null
            //       };

            //       const returnDist = this.haversine_distance(locName);
            //       locName.dist = returnDist.toFixed(2);
            //       console.log(locName);

            //       arrayOfData.push(locName);
            //       console.log(arrayOfData);
            //     })
            //     .catch((error) => {
            //       console.log(error.message);
            //     });
            // }
            // console.log(arrayOfData.locName);
        },

        /**
         * Creates markers on a Google Map for each location in the given data.
         *
         * @param {Array} locData - An array of objects containing latitude and longitude for each location.
         */
        makeMarker(locData) {
            // Log a message indicating that the marker is being made
            console.log("Hi making marker");

            // Log the location data
            console.log(locData);

            // Iterate over the location data
            for (let i = 0; i < locData.length; i++) {
                // Create a new latlng object for the current location
                let latlng = { lat: locData[i].lat, lng: locData[i].lng };

                // Create a new marker for the current location
                let marker = new google.maps.Marker({
                    position: latlng,
                    map: this.map,
                });

                // Add a click event listener to the marker
                marker.addListener('click', () => {
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latlng.lat},${latlng.lng}`;
                    window.open(directionsUrl, '_blank');
                });

                // Add the marker to the markers array
                this.markers.push(marker);
            }
        },

        /**
         * Handles the location error.
         *
         * @param {boolean} browserHasGeolocation - Indicates if the browser has geolocation.
         * @param {infoWindow} thisinfoWindow - The info window object.
         * @param {pos} pos - The position object.
         * @return {void} This function does not return a value.
         */
        handleLocationError(browserHasGeolocation, thisinfoWindow, pos) {
            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent(
                browserHasGeolocation
                    ? "Error: The Geolocation service failed."
                    : "Error: Your browser doesn't support geolocation."
            );
            this.infoWindow.open(this.map);
        },
    },
};
</script>

<style scoped>
#map {
    height: 50vh;
    border-radius: 15px;
}

.card {
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.card-body {
    padding: 15px;
}

body {
    background-color: #f5f5f5;
}
</style>
