<template>
  <div class="signup-page">
    <div class="overlay"></div>
    <div class="signup-container">
      <h1>Create a New Account</h1>
      <p class="subtitle">It’s quick and easy.</p>

      <form @submit.prevent="signup" class="signup-form">
        <div class="name-fields">
          <input type="text" v-model="firstName" placeholder="First name" required />
          <input type="text" v-model="lastName" placeholder="Last name" required />
        </div>

        <label class="section-label">Birthday</label>
        <div class="birthday-fields">
          <select v-model="birthMonth" required>
            <option disabled value="">Month</option>
            <option>Jan</option><option>Feb</option><option>Mar</option>
            <option>Apr</option><option>May</option><option>Jun</option>
            <option>Jul</option><option>Aug</option><option>Sep</option>
            <option>Oct</option><option>Nov</option><option>Dec</option>
          </select>

          <select v-model="birthDay" required>
            <option disabled value="">Day</option>
            <option v-for="n in 31" :key="n">{{ n }}</option>
          </select>

          <select v-model="birthYear" required>
            <option disabled value="">Year</option>
            <option v-for="year in years" :key="year">{{ year }}</option>
          </select>
        </div>

        <label class="section-label">Gender</label>
        <div class="gender-fields">
          <label><input type="radio" value="Female" v-model="gender" /> Female</label>
          <label><input type="radio" value="Male" v-model="gender" /> Male</label>
          <label><input type="radio" value="Custom" v-model="gender" /> Custom</label>
        </div>

        <input type="text" v-model="email" placeholder="Mobile number or email" required />
        <input type="password" v-model="password" placeholder="New password" required />

        <button type="submit" class="signup-btn">Sign Up</button>
      </form>

      <p class="login-text">
        Already have an account?
        <router-link to="/login" class="login-link">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const firstName = ref('')
const lastName = ref('')
const birthMonth = ref('')
const birthDay = ref('')
const birthYear = ref('')
const gender = ref('')
const email = ref('')
const password = ref('')

const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

const signup = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  if (users.find(u => u.email === email.value)) {
    alert('Account with this email already exists!')
    return
  }

  users.push({
    firstName: firstName.value,
    lastName: lastName.value,
    birthMonth: birthMonth.value,
    birthDay: birthDay.value,
    birthYear: birthYear.value,
    gender: gender.value,
    email: email.value,
    password: password.value
  })

  localStorage.setItem('users', JSON.stringify(users))
  alert('Account created successfully!')
  window.location.href = '/login'
}
</script>

<style scoped>
/* ✅ Background and layout */
.signup-page {
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
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 40, 0.45); /* same blue overlay */
  backdrop-filter: brightness(0.7);
  z-index: 0;
}

/* ✅ Signup form card */
.signup-container {
  position: relative;
  z-index: 1;
  max-width: 430px;
  width: 90%;
  background: rgba(255, 255, 255, 0.96);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #222;
}

h1 {
  font-size: 1.8rem;
  color: #111;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
}

.section-label {
  text-align: left;
  font-weight: bold;
  color: #222;
  margin-bottom: 5px;
  display: block;
}

.name-fields {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.name-fields input {
  flex: 1;
}

.birthday-fields,
.gender-fields {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 8px;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 6px;
  margin-bottom: 10px;
  color: #222;
  background-color: #f9f9f9;
}

input:focus, select:focus {
  outline: none;
  border-color: #1877f2;
  background-color: #fff;
}

.gender-fields label {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #222;
}

/* ✅ Buttons */
.signup-btn {
  width: 60%;
  padding: 10px;
  background: #42b72a;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;
}

.signup-btn:hover {
  background: #36a420;
}

/* ✅ Links */
.login-text {
  margin-top: 20px;
  font-size: 0.95rem;
  color: #111;
}

.login-link {
  color: #1877f2;
  text-decoration: none;
  font-weight: bold;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
