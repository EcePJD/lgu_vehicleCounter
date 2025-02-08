import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from "./components/firebase.js";


// Initialize Google Firebase Database 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Vue JS portion
const counterApp = Vue.createApp({
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

const totalsApp = vue.createApp({
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
    }
}).mount("#totals");

/*const STORAGE_KEY = "vehicle_counts";

// Vehicle Counter App
const app = Vue.createApp({
    data() {
        return {
            counters: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
                { Car: 0, Bus: 0, Bike: 0 },
                { Car: 0, Bus: 0, Bike: 0 },
                { Car: 0, Bus: 0, Bike: 0 },
                { Car: 0, Bus: 0, Bike: 0 }
            ]
        };
    },
    methods: {
        increase(index, type) {
            if (this.counters[index][type] < 9999) {
                this.counters[index][type]++;
            }
        },
        decrease(index, type) {
            if (this.counters[index][type] > 0) {
                this.counters[index][type]--;
            }
        },
        saveData() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.counters));
        }
    }
}).mount("#app");

// Total Counts App
const totalsApp = Vue.createApp({
    data() {
        return {
            totalCounts: {}
        };
    },
    created() {
        const counters = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        let totals = {};

        counters.forEach(counter => {
            Object.keys(counter).forEach(type => {
                totals[type] = (totals[type] || 0) + counter[type];
            });
        });

        this.totalCounts = totals;
    }
}).mount("#totals");
*/