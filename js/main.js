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
                tabletID: 0,
                sessionID: 0,
                data: {
                    vehicle: [
                        { label: 'Trucks and Heavy Equipments', count: 0 },
                        { label: 'Public Utility Vehicles (PUV / Jeepney)', count: 0 },
                        { label: 'Sports Utility Vehicle (SUV)', count: 0 },
                        { label: 'SEDAN', count: 0 },
                        { label: 'Tricycle', count: 0 },
                        { label: 'Trike / Padyak', count: 0 },
                        { label: 'Electronic Vehicles', count: 0 },
                        { label: 'Other Vehicles', count: 0 },
                    ],
                    timeStampIn: '',
                    timeStampOut: '',
                    lat: 0,
                    long: 0,
                }
            }
        };
    },
    async created() {
        // Get tablet id from URL
        this.main.tabletID = parseInt(document.URL.slice(document.URL.indexOf("id=") + 3, document.URL.indexOf("id=") + 4));
        this.main.tabletID = (isNaN(this.main.tabletID) || this.main.tabletID > 4) ? 0 : this.main.tabletID;
        // Get session id from URL
        this.main.sessionID = parseInt(document.URL.slice(document.URL.indexOf("ss=") + 3, document.URL.indexOf("ss=") + 4));
        this.main.sessionID = (isNaN(this.main.sessionID) || this.main.sessionID > 4 ) ? 0 : this.main.sessionID;
        // Load saved data from Firebase
        if(this.main.tabletID > 0 && this.main.sessionID > 0) {
            // Get data for current tablet and session id
            if(this.loadTabletData(this.main.tabletID, this.main.sessionID)) {
                console.log("Successfully Loaded Tablet Data");
            } else {
                console.log("Failed to Load Tablet Data");
            }
        } else {
            // Get all data
        }
    },
    methods: {
        increase(i, id = this.main.tabletID, ss = this.main.sessionID) {
            if(this.main.data.vehicle[i].count < 9999) {
                this.main.data.vehicle[i].count++;
                if(this.saveTabletData(id, ss)) {
                    console.log("Successfully Saved Tablet Data");
                } else {
                    console.log("Failed to Save Tablet Data");
                }
            }
        },
        decrease(i, id = this.main.tabletID, ss = this.main.sessionID) {
            if(this.main.data.vehicle[i].count > 0) {
                this.main.data.vehicle[i].count--;
                if(this.saveTabletData(id, ss)) {
                    console.log("Successfully Saved");
                } else {
                    console.log("Failed to Save Tablet Data");
                }
            }
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
                }
                return true;
            }
            return false;
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
    }
}).mount("#app");

/*const counterApp = Vue.createApp({
    data() {
        return {
            counters: [
                { truck: 0, puv: 0, suv: 0, sedan: 0, tricycle: 0, padyak: 0, eVehicle: 0, other: 0 },
                { truck: 0, puv: 0, suv: 0, sedan: 0, tricycle: 0, padyak: 0, eVehicle: 0, other: 0 },
                { truck: 0, puv: 0, suv: 0, sedan: 0, tricycle: 0, padyak: 0, eVehicle: 0, other: 0 },
                { truck: 0, puv: 0, suv: 0, sedan: 0, tricycle: 0, padyak: 0, eVehicle: 0, other: 0 }
            ]
        };
    },
    async created() {
        // Load saved data from Firebase
        const querySnapshot = await getDocs(collection(db, "counters"));
        querySnapshot.forEach(doc => {
            this.counters = doc.data().counters;
        });
    },
    methods: {
        increase(index, type) {
            if(this.counters[index][type] < 9999) {
                this.counters[index][type]++;
                this.saveData();
            }
        },
        decrease(index, type) {
            if(this.counters[index][type] > 0) {
                this.counters[index][type]--;
                this.saveData();
            }
        },
        async saveData() {
            await setDoc(doc(db, "counters", "vehicleData"), {
                counters: this.counters
            });
        }
    }
}).mount("#app");

const totalsApp = Vue.createApp({
    data() {
        return {
            totalsCounts: {}
        };
    },
    async created() {
        const querySnapshot = await getDocs(collection(db, "counters"));
        let totals = {};

        querySnapshot.forEach(doc => {
            let counters = doc.data().counters;
            counters.forEach(counter => {
                Object.keys(counter).forEach(type => {
                    totals[type] = (totals[type] || 0) + counter[type];
                });
            });
        });

        this.totalCounts = totals;
        //console.log(this.totalCounts);
    }
}).mount("#totals");*/