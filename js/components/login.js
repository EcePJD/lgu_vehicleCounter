// Login.js (Standalone Vue Component)
export default {
    template: `
      <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label>Email</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit">Login</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    `,
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      handleLogin() {
        if (this.email === "admin@example.com" && this.password === "password") {
          alert("Login Successful!");
          window.location.href = "http://localhost:5173/?id=1&ss=1"
        } else {
          this.errorMessage = "Invalid email or password.";
        }
      }
    }
  };
  