<template>
  <div class="login-page">
    <NavBar /> <div class="overlay"></div>
    <div class="login-container">
      <h1>Log In</h1>

      <form @submit.prevent="login" class="login-form">
        <input type="text" v-model="email" placeholder="Email address" required />
        <input type="password" v-model="password" placeholder="Password" required />

        <button type="submit" class="login-btn">Log In</button>
      </form>

      <p class="forgot-text">
        <router-link to="/forgot-password" class="forgot-link">Forgot password?</router-link>
      </p>

      <hr class="separator" />

      <p class="signup-text">
        Don’t have an account?
        <router-link to="/signup" class="create-link">Create New Account</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './Navbar.vue'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(
    (u) => u.email === email.value && u.password === password.value
  )

  if (user) {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    alert(`Welcome back, ${user.firstName || user.email}!`)
    router.push('/home')
  } else {
    alert('Invalid email or password')
  }
}
</script>

<style scoped>
/* Define the navbar height used in your global styles */
:root {
  --navbar-height: 80px; 
}

/* 1. Background Container (Matching signup.vue) */
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url("/logos/newpic.jpg"); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  display: flex;
  align-items: center; /* Vertical centering */
  justify-content: center;
  overflow: hidden;
}

/* 2. Overlay (Matching signup.vue) */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 40, 0.45);
  backdrop-filter: brightness(0.7);
  z-index: 0; 
}

/* 3. Login Card (Modified margin-top) */
.login-container {
  position: relative;
  z-index: 1; 
  
  max-width: 380px;
  width: 90%;
  background: rgba(255, 255, 255, 0.96); /* Used semi-transparent white for card consistency */
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #222;

  /* 🔑 CRITICAL FIX: Push the container down below the fixed navbar (80px height + 20px spacing) */
  margin-top: calc(var(--navbar-height) + 20px); 
}

/* --- Input and Form Styles (Retained for visual consistency) --- */

h1 {
  font-size: 1.8rem;
  color: #111;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  color: #222;
  background-color: #e6e6e6; 
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #1877f2;
  background-color: #fff;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background: #1877f2;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 5px;
  transition: 0.3s;
}

.login-btn:hover {
  background: #145db2;
}

.forgot-text {
  margin-top: 15px;
  font-size: 0.9rem;
}

.forgot-link {
  color: #1877f2;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.separator {
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}

.signup-text {
  margin-top: 10px;
  font-size: 0.95rem;
  color: #111;
}

.create-link {
  color: #42b72a;
  text-decoration: none;
  font-weight: bold;
}

.create-link:hover {
  text-decoration: underline;
}
</style>