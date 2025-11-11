<template>
  <div class="forgot-page">
    <div class="overlay"></div>

    <div class="forgot-container">
      <h2>Forgot Password?</h2>
      <p>Enter your email to retrieve or reset your password.</p>

      <form @submit.prevent="findAccount">
        <input type="text" v-model="email" placeholder="Enter your email" required />
        <button type="submit" class="find-btn">Find Account</button>
      </form>

      <div v-if="foundUser" class="result-box">
        <p><strong>Account found for:</strong> {{ foundUser.firstName }} {{ foundUser.lastName }}</p>

        <p>Want to reset it?</p>
        <p>Enter a new password below:</p>
        <input type="password" v-model="newPassword" placeholder="Enter new password" />
        <button @click="resetPassword" class="reset-btn">Reset Password</button>
      </div>

      <router-link to="/login" class="back-link">Back to Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const newPassword = ref('')
const foundUser = ref(null)

const findAccount = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.email === email.value)

  if (user) {
    foundUser.value = user
  } else {
    alert('No account found with that email.')
  }
}

const resetPassword = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const index = users.findIndex(u => u.email === email.value)

  if (index !== -1) {
    users[index].password = newPassword.value
    localStorage.setItem('users', JSON.stringify(users))
    alert('Password reset successfully!')
    window.location.href = '/login'
  }
}
</script>

<style scoped>
.forgot-page {
  position: relative;
  min-height: 100vh;
  background: url('/logos/newpic.jpg') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 40, 0.45);
  backdrop-filter: brightness(0.7); /* slightly dim like login */
}

.forgot-container {
  position: relative;
  z-index: 2;
  max-width: 420px;
  width: 90%;
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  margin-bottom: 10px;
}

p {
  color: #444;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 1rem;
}

.find-btn,
.reset-btn {
  width: 100%;
  padding: 10px;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

.find-btn {
  background: #1877f2;
}

.reset-btn {
  background: #42b72a;
}

.back-link {
  display: block;
  margin-top: 15px;
  color: #1877f2;
  font-weight: 500;
}
</style>
