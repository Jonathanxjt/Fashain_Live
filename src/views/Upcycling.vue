<template>
    <div>
      <NavBar></NavBar>
      <div class="container mt-4">
        <div class="row justify-content-center">
            <!-- display map -->
          <div class="col-md-8 col-12">
            <div class="card mb-4">
              <div class="card-body">
                <div v-if="showMap" id="map-container" class="map-container"></div>
              </div>
            </div>
          </div>
          <!-- display ongoing campaigns -->
          <div class="col-md-4 col-12">
            <div class="ongoing-campaigns">
              <h3 class="campaigns-title">Ongoing Upcycling Drives</h3>
              <div class="campaign-list">
                <div class="campaign-card mb-3" v-for="campaign in campaigns" :key="campaign.id" @click="centerMapOnBusiness(campaign.uid)">
                  <div class="campaign-header">
                    <h4 class="campaign-business-name">{{ campaign.businessName }}</h4>
                    <div class="campaign-dates">
                      <p><strong>Start:</strong> {{ formatDate(new Date(campaign.startdate.seconds * 1000)) }}</p>
                      <p><strong>End:</strong> {{ formatDate(new Date(campaign.enddate.seconds * 1000)) }}</p>
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
    import { collection, query, where, getFirestore, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
    import NavBar from "../components/NavBar.vue";

    const db = getFirestore();
    
    export default {
    components: { NavBar },
    data() {
        return {
            businesses: [],
            campaigns: [],
            showMap: false,
            map: null, 
            markers: {},
        };
    },

    methods: {
        
        async fetchCampaigns() {
            const now = new Date();
            const campaignsQuery = query(collection(db, "upcycling"));
            const campaignsSnapshot = await getDocs(campaignsQuery);
            const campaignsPromises = campaignsSnapshot.docs.map(async campaignDoc => {
                const campaignData = campaignDoc.data();
                const start = new Date(campaignData.startdate.seconds * 1000);
                const end = new Date(campaignData.enddate.seconds * 1000);
                if (start <= now && end >= now) {
                    const businessRef = doc(db, "users", campaignDoc.id);
                    const businessSnap = await getDoc(businessRef);
                    if (businessSnap.exists()) {
                        return {
                            id: campaignDoc.id,
                            uid: businessSnap.id,
                            businessName: businessSnap.data().name,
                            startdate: campaignData.startdate,
                            enddate: campaignData.enddate,
                        };
                    }
                }
            });

            this.campaigns = (await Promise.all(campaignsPromises)).filter(campaign => campaign !== undefined);
        },

        async fetchBusinessesWithCampaigns() {
            await this.fetchCampaigns();
            const businessIdsWithCampaigns = this.campaigns.map(c => c.id);
            

            if (businessIdsWithCampaigns.length > 0) {
                const businessQuery = query(collection(db, "users"), where("uid", "in", businessIdsWithCampaigns));
                const querySnapshot = await getDocs(businessQuery);
                this.businesses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                this.showMap = true; 
            }
        },

        formatDate(date) {
            return date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        },

        initializeMap() {
        if (!this.businesses.length) return;

        this.map = new google.maps.Map(document.getElementById("map-container"), {
            center: { lat: this.businesses[0].address.latitude, lng: this.businesses[0].address.longitude },
            zoom: 15,
        });

        this.businesses.forEach(business => {
            const position = new google.maps.LatLng(business.address.latitude, business.address.longitude);
            const marker = new google.maps.Marker({
                position,
                map: this.map,
                title: business.name,
            });

            this.markers[business.uid] = marker;

            const infoWindow = new google.maps.InfoWindow({
                content: `<div><strong>${business.name}</strong></div>`,
            });

            infoWindow.open(this.map, marker);

            marker.addListener('click', () => {
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.address.latitude},${business.address.longitude}`;
                    window.open(directionsUrl, '_blank');
                });
        });
    },

        centerMapOnBusiness(businessId) {
            const marker = this.markers[businessId];
            if (marker) {
                this.map.panTo(marker.getPosition());
                this.map.setZoom(15);
            }
        },


    },

    mounted() {
        this.fetchBusinessesWithCampaigns().then(() => {
            if (this.businesses.length > 0) {
            this.showMap = true;
            this.$nextTick(() => {
                this.initializeMap();
            });
            }
        }).catch(error => {
            console.error("Failed to fetch campaigns and business locations:", error);
        });
    },
 
};

</script>

<style scoped>
  .map-container {
    height: 50vh; 
    border-radius: 15px;
  }

  .card {
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .card-body {
    padding: 15px;
  }

  .campaigns-title {
    font-size: 1.5rem;
    color: #003329;
    margin-bottom: 1rem;
    text-align: center;
  }

  .campaign-list {
    margin-top: 1rem;
  }

  .campaign-card {
    background-color: #fff;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .campaign-card:hover {
    transform: translateY(-5px);
  }

  .campaign-header {
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .campaign-business-name {
    font-weight: bold;
    color: #359381;
    margin-bottom: 0.5rem;
  }

  .campaign-dates p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }

  .campaign-dates strong {
    color: #003329;
  }
</style>