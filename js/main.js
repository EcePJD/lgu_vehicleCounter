const STORAGE_KEY = "vehicle_counts";

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
