<template>
    <NavBar />
    <div id="app" class="formbold-main-wrapper">
        <!-- Author: FormBold Team -->
        <!-- Learn More: https://formbold.com -->
        <div class="formbold-form-wrapper">
            <div class="formbold-event-wrapper">
                <span>Fashain</span>
                <h3>Create your own campaign now!</h3>
                <form @submit.prevent="submit">
                    <!-- Campaign Name -->
                    <div class="formbold-input-flex">
                        <div>
                            <label for="camName" class="formbold-form-label"> Campaign name </label>
                            <input
                                v-model="campaignName"
                                type="text"
                                name="campaignName"
                                id="campaignName"
                                class="formbold-form-input" />
                            <label for="campaignAddress" class="formbold-form-label"> Campaign Address </label>
                            <input
                                v-model="campaignAddress"
                                type="text"
                                name="campaignAddress"
                                id="campaignAddress"
                                class="formbold-form-input" />
                        </div>
                    </div>

                    <!-- Campaign Start Date & End Date-->
                    <div class="formbold-input-flex">
                        <div>
                            <label for="dob" class="formbold-form-label"> Start Date </label>
                            <input
                                v-model="campaignStartDate"
                                type="date"
                                name="dob"
                                id="dob"
                                class="formbold-form-input" />
                        </div>
                        <div>
                            <label for="dob" class="formbold-form-label"> End Date </label>
                            <input
                                v-model="campaignEndDate"
                                type="date"
                                name="dob"
                                id="dob"
                                class="formbold-form-input" />
                        </div>
                    </div>

                    <!-- Campaign Description -->
                    <div class="formbold-mb-3">
                        <label for="message" class="formbold-form-label"> Campaign Description </label>
                        <textarea
                            v-model="campaignDesc"
                            rows="6"
                            name="message"
                            id="message"
                            class="formbold-form-input"></textarea>
                    </div>

                    <!-- File to upload image -->
                    <div class="formbold-input-file">
                        <div class="formbold-filename-wrapper">
                            <label for="upload" class="formbold-input-label">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
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
                                    type="file"
                                    ref="fileInput"
                                    accept="image/*"
                                    name="upload"
                                    id="upload"
                                    @change="handleImageUpload($event)" />
                            </label>
                            <div v-if="imageError.length > 0">
                                <div v-for="(error, index) in imageError" :key="index">
                                    <span class="text-danger">{{ error }}</span>
                                </div>
                            </div>
                            <!-- Display Image once Image uploaded -->
                            <div class="container-fluid">
                                <div class="row">
                                    <img class="rounded" v-if="image.url" :src="image.url" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <p class="formbold-policy">
                        By filling out this form and clicking submit, you acknowledge our
                        <a href="#">privacy policy.</a>
                    </p>
                    <button class="formbold-btn">Submit Campaign Creation</button>
                </form>
            </div>
        </div>
    </div>
</template>

<!-- https://blog.openreplay.com/building-a-custom-file-upload-component-for-vue/ -->
<script>
import NavBar from "../components/NavBar.vue";
import {
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    CollectionReference,
    arrayUnion,
    Timestamp,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import db, { auth } from "../firebase/init.js";
import storage from "../firebase/init.js";
import router from "../router";
export default {
    components: { NavBar },
    name: "Campaign",

    data() {
        return {
            campaignName: "",
            campaignAddress: "",
            campaignStartDate: "",
            campaignEndDate: "",
            campaignDesc: "",
            image: {
                imageName: "",
                imageExt: "",
                url: "",
                isImage: false,
                //isUploaded: false,
            },
            imageError: [],
            listOfErrors: [],
        };
    },
    methods: {
        /**
         * Submits the form data to the server after performing validation.
         *
         * @return {void}
         */
        // https://www.youtube.com/watch?v=-yrnWnN0g9o&t=554s good example
        async submit() {
            const userDbRef = collection(db, "campaigns");
            //let fUrl = 'https://firestore.googleapis.com/v1/projects/fashain/databases/(default)/documents/users/ZOxhPvxo8odRRu3po7FZ/campaigns';
            this.listOfErrors = [];
            console.log(localStorage.getItem("uid"));
            if (this.checkDate() == true && this.checkEmpty() == true) {
                console.log("Do push to DB");
                const data = {
                    campaignName: this.campaignName,
                    campaignAddress: this.campaignAddress,
                    campaignStartDate: this.campaignStartDate,
                    campaignEndDate: this.campaignEndDate,
                    campaignDesc: this.campaignDesc,
                    campaignImage: this.image.url,
                };

                console.log(typeof this.campaignStartDate);
                // let data = {
                //     campaignName: 'test',
                //     campaignAddress: 'dsadsacx',
                //     campaignStartDate: new Date(10/10/2023).getTime(),
                //     campaignEndDate: new Date(10/11/2023).getTime(),
                //     campaignDesc: 'tedsadsa',
                //     campaignImage: this.image.url,
                // };
                // const uidRef = doc(userDbRef, auth.currentUser.uid);
                // await setDoc(uidRef, { listOfCampaign: arrayUnion(data) }, { merge: true })
                try {
                    console.log("Hi inside trying to upload");
                    // 2nd Field is the UID
                    const uidRef = doc(userDbRef, auth.currentUser.uid);
                    await setDoc(uidRef, { listOfCampaign: arrayUnion(data) }, { merge: true });
                    alert("Campaign created successfully");
                    router.push("/");
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                alert(this.listOfErrors);
            }
            //To get Data
            // const uidRef = doc(userDbRef, 'ZOxhPvxo8odRRu3po7FZ', 'campaigns', 'campaign');
            // const docSnap = await getDoc(uidRef);

            // if (docSnap.exists()) {
            //     console.log("Document data:", docSnap.data());
            // }
            // else
            // {
            //     console.log("No such document!");
            // }
            // await updateDoc(uidRef, {
            //     listOfCampaign: arrayUnion(data)
            // });
            // https://www.codingbeautydev.com/blog/vue-prevent-form-submission
            // }
        },

        /**
         * A function to check if the campaign end date is greater than or equal to the campaign start date.
         *
         * @return {boolean} Returns true if the campaign end date is greater than or equal to the campaign start date, otherwise returns false.
         */
        checkDate() {
            var before = this.campaignStartDate;
            var after = this.campaignEndDate;
            if (after >= before) {
                // console.log(true);
                return true;
            } else {
                // console.log(false);
                this.listOfErrors.push("Invalid date");
                return false;
            }
        },

        /**
         * Checks if any of the campaign fields are empty.
         *
         * @return {boolean} Returns `true` if all fields are filled, `false` otherwise.
         */
        checkEmpty() {
            if (
                this.campaignName == "" ||
                this.campaignAddress == "" ||
                this.campaignStartDate == "" ||
                this.campaignEndDate == "" ||
                this.campaignDesc == ""
            ) {
                this.listOfErrors.push("There is one or more empty fields");
                return false;
            } else {
                return true;
            }
        },

        /**
         * Uploads an image and returns the URL.
         *
         * @param {type} img - the image to upload
         * @return {type} Promise - a promise that resolves with the image URL
         */
        async uploadImageAndReturnURL(img) {
            const storage = getStorage();
            const storageRef = ref(storage, "folder/campaign/" + this.imageName + "." + this.imageExt);
            await uploadBytes(storageRef, img)
                .then((snapshot) => {
                    console.log("Image uploaded");
                })
                .catch((error) => {
                    console.log(error);
                }),
                await getDownloadURL(storageRef).then((url) => {
                    this.image.url = url;
                    console.log(this.image.url);
                });
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
                    console.log("hello inside image is valid");
                    const img = image.target.files[0];
                    this.imageExt = img.name.split(".").pop();
                    this.imageName = img.name.split(".").shift();
                    this.isImage = ["png", "jpg", "jpeg"].includes(this.imageExt);
                    this.uploadImageAndReturnURL(image.target.files[0]);
                    // console.log(this.imageName + this.imageExt, this.isImage);
                } else {
                    console.log("Invalid file");
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
    },
};
// };
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Inter", sans-serif;
}

.formbold-main-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
}

.formbold-form-wrapper {
    margin: 0 auto;
    max-width: 550px;
    width: 100%;
    background: white;
}

.formbold-event-wrapper span {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 2.5px;
    color: #6a64f1;
    display: inline-block;
    margin-bottom: 12px;
}

.formbold-event-wrapper h3 {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    color: #07074d;
    width: 60%;
    margin-bottom: 15px;
}

.formbold-event-wrapper h4 {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #07074d;
    width: 60%;
    margin: 25px 0 15px;
}

.formbold-event-wrapper p {
    font-size: 16px;
    line-height: 24px;
    color: #536387;
}

.formbold-event-details {
    background: #fafafa;
    border: 1px solid #dde3ec;
    border-radius: 5px;
    margin: 25px 0 30px;
}

.formbold-event-details h5 {
    color: #07074d;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    padding: 15px 25px;
}

.formbold-event-details ul {
    border-top: 1px solid #edeef2;
    padding: 25px;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    row-gap: 14px;
}

.formbold-event-details ul li {
    color: #536387;
    font-size: 16px;
    line-height: 24px;
    width: 50%;
    display: flex;
    align-items: center;
    gap: 10px;
}

.formbold-form-title {
    color: #07074d;
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    width: 60%;
    margin-bottom: 30px;
}

.formbold-input-flex {
    gap: 20px;
    margin-bottom: 15px;
}

.formbold-input-flex > div {
    width: 100%;
}

.formbold-form-input {
    text-align: center;
    width: 100%;
    padding: 13px 22px;
    border-radius: 5px;
    border: 1px solid #dde3ec;
    background: #ffffff;
    font-weight: 500;
    font-size: 16px;
    color: #536387;
    outline: none;
    resize: none;
}

.formbold-form-input:focus {
    border-color: #6a64f1;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

.formbold-form-label {
    color: #536387;
    font-size: 14px;
    line-height: 24px;
    display: block;
    margin-bottom: 10px;
}

.formbold-policy {
    font-size: 14px;
    line-height: 24px;
    color: #536387;
    width: 70%;
    margin-top: 22px;
}

.formbold-policy a {
    color: #6a64f1;
}

.formbold-btn {
    text-align: center;
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
    padding: 14px 25px;
    border: none;
    font-weight: 500;
    background-color: #6a64f1;
    color: white;
    cursor: pointer;
    margin-top: 25px;
}

.formbold-btn:hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

.formbold-input-file {
    margin-top: 30px;
}

.formbold-input-file input[type="file"] {
    position: absolute;
    top: 6px;
    left: 0;
    z-index: -1;
}

.formbold-input-file .formbold-input-label {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
}
</style>
