import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDoc, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from "./components/firebase.js";


// Initialize Google Firebase Database 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize the Vue JS Application
const counter = Vue.createApp({
    data() {
        return {
            main: {
                data: {
                    vehicle: [
                        { label: 'Trucks and Heavy Equipments', count: 0, formattedText: '0000' },
                        { label: 'Public Utility Vehicles (PUV / Jeepney)', count: 0, formattedText: '0000' },
                        { label: 'Sports Utility Vehicle (SUV)', count: 0, formattedText: '0000' },
                        { label: 'SEDAN', count: 0, formattedText: '0000' },
                        { label: 'Tricycle', count: 0, formattedText: '0000' },
                        { label: 'Trike / Padyak', count: 0, formattedText: '0000' },
                        { label: 'Electronic Vehicles', count: 0, formattedText: '0000' },
                        { label: 'Other Vehicles', count: 0, formattedText: '0000' },
                    ],
                    timeStampIn: '',
                    timeStampOut: '',
                    lat: 0,
                    long: 0,
                    tabletID: 0,
                    sessionID: 0,
                }
            },
            all: [],
            intervalID: null
        };
    },
    async created() {
        // Get tablet id from URL
        this.main.data.tabletID = parseInt(document.URL.slice(document.URL.indexOf("id=") + 3, document.URL.indexOf("id=") + 4));
        this.main.data.tabletID = (isNaN(this.main.data.tabletID) || this.main.data.tabletID > 4) ? 0 : this.main.data.tabletID;
        // Get session id from URL
        this.main.data.sessionID = parseInt(document.URL.slice(document.URL.indexOf("ss=") + 3, document.URL.indexOf("ss=") + 4));
        this.main.data.sessionID = (isNaN(this.main.data.sessionID) || this.main.data.sessionID > 4 ) ? 0 : this.main.data.sessionID;
        // Load saved data from Firebase
        if(this.main.data.tabletID > 0 && this.main.data.tabletID < 5 && this.main.data.sessionID > 0 && this.main.data.sessionID < 5) {
            // Get data for current tablet and session id
            if(this.loadTabletData(this.main.data.tabletID, this.main.data.sessionID)) {
                console.log("Successfully Loaded Tablet Data");
            } else {
                console.log("Failed to Load Tablet Data");
            }
        } else {
            if(this.loadAllData()) {
                console.log("Successfully loaded all the data");
            } else {
                console.log("Failed to load all the data");
            }
        }
    },
    async mounted() {
        if(this.main.data.tabletID == 0 || this.main.data.tabletID > 4 || this.main.data.sessionID == 0 || this.main.data.sessionID > 4) {
            this.intervalID = setInterval(() => {
                if(this.loadAllData()) {
                    console.log("Successfully loaded all the data");
                } else {
                    console.log("Failed to load all the data");
                }
            }, 5000);
        }
    },
    async beforeUnmount() {
        clearInterval(this.intervalID);
    },
    methods: {
        increase(i, id = this.main.data.tabletID, ss = this.main.data.sessionID) {
            if(this.main.data.vehicle[i].count < 9999) {
                this.main.data.vehicle[i].count++;
                this.main.data.vehicle[i].formattedText = this.formatCounter(this.main.data.vehicle[i].count);
                if(this.saveTabletData(id, ss)) {
                    console.log("Successfully Saved Tablet Data");
                } else {
                    console.log("Failed to Save Tablet Data");
                }
            }
        },
        decrease(i, id = this.main.data.tabletID, ss = this.main.data.sessionID) {
            if(this.main.data.vehicle[i].count > 0) {
                this.main.data.vehicle[i].count--;
                this.main.data.vehicle[i].formattedText = this.formatCounter(this.main.data.vehicle[i].count);
                if(this.saveTabletData(id, ss)) {
                    console.log("Successfully Saved");
                } else {
                    console.log("Failed to Save Tablet Data");
                }
            }
        },
        formatCounter(count) {
            return String(count).padStart(4, '0');
        },
        async saveTabletData(id, ss) {
            // Save the current tablet and session data to Google Firebase DB
            if(id > 0 && id < 5
                && ss > 0 && ss < 5) {
                await setDoc(
                    doc( db,
                         "vehicleCounter",
                         `id-${id}-ss-${ss}`
                    ), this.main.data 
                );
                return true;
            }
            return false;
        },
        async loadTabletData(id, ss) {
            // Get the current tablet and session data from Google Firebase DB
            if(id > 0 && id < 5
                && ss > 0 && ss < 5) {
                const currentData = await getDoc(
                    doc( db,
                         "vehicleCounter",
                         `id-${id}-ss-${ss}`
                    )
                );
                if(currentData.exists()) {
                    this.main.data = currentData.data();
                    return true;
                }
            }
            return false;
        },
        async loadAllData() {
            const allData = await getDocs(collection(db, "vehicleCounter"));
            let importedData = [];
            allData.forEach((doc) => {
                importedData.push(doc.data());
            });
            if(importedData.length > 0) {
                this.all = importedData;
                return true;
            }
            return false;
        }
    }
}).mount("#app");