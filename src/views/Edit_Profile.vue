<template>
	<NavBar />
	<div class="container">
		<div class="row">
			<div class="col-12">
				<!-- Page title -->
				<div class="my-5">
					<h3>My Profile</h3>
					<hr>
				</div>
				<!-- Form START -->
				<form class="file-upload">
					<div class="row mb-5 gx-5">
						<!-- Contact detail -->
						<div class="col-xxl-8 mb-5 mb-xxl-0">
							<div class="bg-secondary-soft px-4 py-5 rounded">
								<div class="row g-3">
									<h4 class="mb-4 mt-0">Contact detail</h4>
									<!-- Name -->
									<div class="col-md-6">
										<label class="form-label">Name</label>
										<input type="text" class="form-control" placeholder="" v-model="user.name">
									</div>

									<!-- Contact No -->
									<div class="col-md-6">
										<label class="form-label">Contact No</label>
										<input type="text" class="form-control" placeholder="" v-model="user.contactno">
									</div>

									<!-- Email -->
									<div class="col-md-6">
										<label for="inputEmail4" class="form-label">Email</label>
										<input type="email" class="form-control" id="inputEmail4" v-model="user.email">
									</div>

								</div> <!-- Row END -->
							</div>
						</div>
						<!-- Upload profile -->
						<div class="col-xxl-4">
							<div class="bg-secondary-soft px-4 py-5 rounded">
								<div class="row g-3">
									<h4 class="mb-4 mt-0">Upload your profile photo</h4>
									<div class="text-center">
										<!-- Image upload -->
										<!-- File to upload image -->
										<div class="formbold-input-file">
											<div class="formbold-filename-wrapper">
												<label for="upload" class="formbold-input-label">
													<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<g clip-path="url(#clip0_1670_1531)">
															<path
																d="M12.3568 6.4644L7.64349 11.1786C7.5639 11.2554 7.50041 11.3474 7.45674 11.4491C7.41307 11.5507 7.39008 11.6601 7.38912 11.7707C7.38815 11.8814 7.40924 11.9911 7.45114 12.0935C7.49304 12.1959 7.55492 12.289 7.63316 12.3672C7.71141 12.4455 7.80445 12.5073 7.90686 12.5492C8.00928 12.5912 8.11901 12.6122 8.22966 12.6113C8.34031 12.6103 8.44966 12.5873 8.55133 12.5436C8.653 12.5 8.74495 12.4365 8.82182 12.3569L13.536 7.64356C14.0049 7.17468 14.2683 6.53875 14.2683 5.87565C14.2683 5.21255 14.0049 4.57661 13.536 4.10773C13.0671 3.63885 12.4312 3.37544 11.7681 3.37544C11.105 3.37544 10.469 3.63885 10.0002 4.10773L5.28599 8.8219C4.89105 9.20701 4.57652 9.6667 4.36062 10.1743C4.14473 10.6819 4.03178 11.2274 4.02832 11.779C4.02487 12.3306 4.13097 12.8774 4.34049 13.3877C4.55 13.8979 4.85876 14.3615 5.24884 14.7516C5.63892 15.1416 6.10256 15.4503 6.61287 15.6597C7.12318 15.8692 7.67 15.9752 8.2216 15.9717C8.77321 15.9681 9.31862 15.8551 9.82621 15.6391C10.3338 15.4232 10.7934 15.1086 11.1785 14.7136L15.8927 10.0002L17.071 11.1786L12.3568 15.8927C11.8151 16.4344 11.172 16.8641 10.4643 17.1573C9.75649 17.4505 8.99791 17.6014 8.23182 17.6014C7.46574 17.6014 6.70716 17.4505 5.99939 17.1573C5.29162 16.8641 4.64853 16.4344 4.10682 15.8927C3.56512 15.351 3.13542 14.7079 2.84225 14.0002C2.54908 13.2924 2.39819 12.5338 2.39819 11.7677C2.39819 11.0016 2.54908 10.2431 2.84225 9.5353C3.13542 8.82753 3.56512 8.18443 4.10682 7.64273L8.82182 2.9294C9.60767 2.17041 10.6602 1.75043 11.7527 1.75992C12.8451 1.76942 13.8902 2.20762 14.6627 2.98015C15.4353 3.75269 15.8735 4.79774 15.883 5.89023C15.8925 6.98271 15.4725 8.03522 14.7135 8.82106L10.0002 13.5369C9.76794 13.7691 9.49226 13.9532 9.18887 14.0788C8.88548 14.2045 8.56032 14.2691 8.23195 14.2691C7.90357 14.269 7.57843 14.2043 7.27507 14.0786C6.97171 13.9529 6.69607 13.7687 6.46391 13.5365C6.23174 13.3043 6.04759 13.0286 5.92196 12.7252C5.79633 12.4218 5.7317 12.0966 5.73173 11.7683C5.73177 11.4399 5.79649 11.1148 5.92219 10.8114C6.04788 10.508 6.2321 10.2324 6.46432 10.0002L11.1785 5.28606L12.3568 6.4644Z"
																fill="#07074D" />
														</g>
														<defs>
															<clipPath id="clip0_1670_1531">
																<rect width="20" height="20" fill="white" />
															</clipPath>
														</defs>
													</svg>
													Attach files
													<input 
													
													type="file" ref="fileInput" accept="image/*" name="upload"
														id="upload" @change="handleImageUpload($event)">
												</label>
												<div v-if="imageError.length > 0">
													<div v-for="(error, index) in imageError" :key="index">
														<span class="text-danger">{{ error }}</span>
													</div>
												</div>
												<!-- Display Image once Image uploaded -->
												<div class="container-fluid mt-2">
													<div class="row">
														<img class="rounded" v-if="image.url" :src="image.url" />
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div> <!-- Row END -->
					<!-- button -->
					<div class="gap-3 d-md-flex justify-content-md-end text-center">
						<button type="button" class="btn btn-custom-outline btn-lg" @click="updateUserProfile" >Update profile</button>
					</div>
				</form> <!-- Form END -->
			</div>
		</div>
	</div>
</template>
<style>
body {
	color: #9b9ca1;
}

.bg-secondary-soft {
	background-color: rgba(208, 212, 217, 0.1) !important;
}

.rounded {
	border-radius: 5px !important;
}

.py-5 {
	padding-top: 3rem !important;
	padding-bottom: 3rem !important;
}

.px-4 {
	padding-right: 1.5rem !important;
	padding-left: 1.5rem !important;
}


.text-secondary {
	--bs-text-opacity: 1;
	color: rgba(208, 212, 217, 0.5) !important;
}

.btn-success-soft {
	color: #28a745;
	background-color: rgba(40, 167, 69, 0.1);
}

.btn-danger-soft {
	color: #dc3545;
	background-color: rgba(220, 53, 69, 0.1);
}

.form-control {
	display: block;
	width: 100%;
	padding: 0.5rem 1rem;
	font-size: 0.9375rem;
	font-weight: 400;
	line-height: 1.6;
	color: #29292e;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #e5dfe4;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border-radius: 5px;
	-webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

input[type="file"] {
  
}

input[type="file"]::file-selector-button {
    background-color: transparent;
    border: 2px solid #665c37;
    border-radius: 5px;
    padding: 10px 20px;
    color: #665c37;
    cursor: pointer;
}

input[type="file"]:hover::file-selector-button {
    background-color: #665c37;
    color: white;
}
.btn-custom-outline {
    background-color: transparent;
    border: 2px solid #665c37;
    color: #665c37;
}

.btn-custom-outline:hover,
.btn-custom-outline:focus {
    background-color: #665c37;
    color: white;
    border: 2px solid #665c37;
}

</style>
<script>
import NavBar from "../components/NavBar.vue";

import { doc, onSnapshot, updateDoc, setDoc, deleteDoc, collection, serverTimestamp, getDocs, query, where, orderBy, limit, CollectionReference, arrayUnion, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import db, { auth } from '../firebase/init.js';
import storage from '../firebase/init.js';
import { Alert } from "bootstrap";
export default {
	components: { NavBar },
	name: "Edit_Profile",
	data() {
		return {
			image: {
				imageName: "",
				imageExt: "",
				url: "https://placehold.co/400",
				isImage: false,
				//isUploaded: false,
			},
			imageError: [],
			listOfErrors: [],
			user: {
				uid: localStorage.getItem("user_uid"),
				name: "",
				email: "",
				contactno: "",
				image: "",
			}
		};
	},
	created() {
		const q = query(collection(db, "users"), where("uid", "==", this.user.uid));
		getDocs(q).then((querySnapshot) => {
			querySnapshot.forEach((user_details) => {
				console.log(user_details.id);
				this.user.name = user_details.data().name;
				this.user.email = user_details.data().email;
				this.user.image = user_details.data().image.url;
				this.user.contactno = user_details.data().contactno;
				this.image.url = user_details.data().image;
				//this.user.joindate = user_details.data().joindate.toDate();
				console.log("test");
			});
		});
	},
	methods: {
		async uploadImageAndReturnURL(img) {
			const storage = getStorage();
			const storageRef = ref(storage, 'folder/campaign/' + this.imageName + '.' + this.imageExt);
			await uploadBytes(storageRef, img).then((snapshot) => {
				console.log('Image uploaded');
			}).catch((error) => {
				console.log(error);
			}),
				await getDownloadURL(storageRef).then((url) => {
					this.image.url = url;
					console.log(this.image.url);
				})
		},

		/**
		 * Handles the image upload.
		 *
		 * @param {Object} image - The image to be uploaded.
		 */
		handleImageUpload(image) {
			// this.uploadedImage = event.target.files[0];
			// let filename = this.uploadedImage.name;
			// console.log(this.uploadedImage);
			this.imageError = [];

			if (image.target.files && image.target.files[0]) {
				if (this.isImageValid(image.target.files[0])) {
					console.log('hello inside image is valid');
					const img = image.target.files[0];
					this.imageExt = img.name.split(".").pop();
					this.imageName = img.name.split(".").shift();
					this.isImage = ["png", "jpg", "jpeg"].includes(
						this.imageExt
					);
					this.uploadImageAndReturnURL(image.target.files[0]);
					// console.log(this.imageName + this.imageExt, this.isImage);
				} else {
					console.log('Invalid file');
				}
			}
		},

		/**
		 * Check if the image type is valid.
		 *
		 * @param {string} imageExt - The extension of the image file.
		 */
		isImageTypeValid(imageExt) {
			//console.log(imageExt);
			let validType = ["png", "jpg", "jpeg"];
			if (validType.includes(imageExt)) {
				console.log("Image type is valid");
			} else {
				//console.log(this.imageError);
				this.imageError.push(`Image type is not valid`);
			}
		},

		/**
		 * Check if the provided image is valid.
		 *
		 * @param {object} image - The image to be validated.
		 * @return {boolean} Returns true if the image is valid, false otherwise.
		 */
		isImageValid(image) {
			this.isImageTypeValid(image.name.split(".").pop());
			//console.log(this.imageError.length);
			if (this.imageError.length === 0) {
				return true;
			} else {
				return false;
			}
		},
		updateUserProfile() {
        const userRef = doc(db, "users", this.user.uid);
        const newProfileData = {
            name: this.user.name,
            contactno: this.user.contactno,
            email: this.user.email,
			image: this.url,
            // Add other fields if needed
        };
		if (this.image.url && this.image.url.trim() !== "") {
            newProfileData.image = this.image.url;
        }

        updateDoc(userRef, newProfileData)
            .then(() => {
                // Profile updated successfully
				window.alert("Profile updated successfully");
                console.log("Profile updated successfully");
                // You can also show a success message to the user
				window.location.href = '/profile';
            })
            .catch((error) => {
                // Handle errors
                console.error("Error updating profile: ", error);
                // You can also show an error message to the user
            });
    }
		
	},

};
</script>
