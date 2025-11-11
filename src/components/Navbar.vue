<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <div class="logo-container">
        <img
          src="/logos/chccilogo.jpg"
          alt="CHCC Logo"
          class="logo-img"
        />
      </div>
      <div class="brand-text-container">
        <span class="brand-text">Concepcion Holy Cross College</span>
      </div>
    </div>

    <div class="header-right">
      <div class="navbar-nav">
        <a
          v-for="item in items"
          :key="item.label"
          href="#"
          class="nav-link"
          @click.prevent="navigate(item.to)"
        >
          <span>{{ item.label }}</span>
        </a>
      </div>

      <div class="profile-dropdown" @click="toggleDropdown">
        <img src="/logos/profileboy.jpg" alt="Profile" class="profile-icon" />
        <span class="arrow" :class="{ open: isDropdownOpen }">▼</span>

        <div v-if="isDropdownOpen" class="dropdown-menu" @click.stop>
          <p class="user-name">
            {{ currentUser?.name || (currentUser ? currentUser.firstName + ' ' + currentUser.lastName : 'Guest') }}
          </p>

          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </div>
    </div>

    <button class="mobile-toggle" @click="toggleMobile" :class="{ active: mobileOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="mobile-overlay" :class="{ active: mobileOpen }" @click="mobileOpen = false"></div>

    <div class="mobile-menu" :class="{ active: mobileOpen }">
      <div class="mobile-header">
        <div class="mobile-brand">
  <img src="/logos/mainlogo.png" alt="CHCC Logo" class="mobile-logo" />
  <span>CHCC</span>
</div>

        <button class="mobile-close" @click="mobileOpen = false">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="mobile-nav">
        <router-link
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          class="mobile-link"
          @click="mobileOpen = false"
        >
          <span>{{ item.label }}</span>
        </router-link>
      </div>
      </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const mobileOpen = ref(false)
const isDropdownOpen = ref(false)
const currentUser = ref(null)
const isLoggedIn = ref(false)

const items = ref([
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'News & Events', to: '/news' },
  { label: 'Programs', to: '/programs' },
  { label: 'ChccPage', to: '/chccpage' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Create Post', to: '/create-post' }
])

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = (e) => {
  if (!e.target.closest('.profile-dropdown')) {
    isDropdownOpen.value = false
  }
}

// ✅ Load logged-in user
const loadUser = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'))
  if (user) {
    currentUser.value = user
    isLoggedIn.value = true
  } else {
    currentUser.value = null
    isLoggedIn.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', closeDropdown)
  loadUser()
})

// ✅ Refresh user info when page changes (e.g., after login)
watch(() => route.fullPath, () => {
  loadUser()
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

// ✅ Logout function
const logout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('loggedInUser')
  currentUser.value = null
  router.push('/login')
}
// ✅ Prevent navigation if not logged in
const navigate = (path) => {
  if (!isLoggedIn.value) {
    alert('Please log in first.')
    router.push('/login')
  } else {
    router.push(path)
  }
}

</script>

<style>
/* Global reset and variables */
:root {
--primary-color: #1e40af;
--primary-light: #3b82f6;
--primary-dark: #1e3a8a;
--accent-color: #f59e0b;
--accent-hover: #d97706;
--text-dark: #1f2937;
--text-light: #6b7280;
--border-color: #e5e7eb;
--bg-light: #f8fafc;
--white: #ffffff;
--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--navbar-height: 80px; /* Default desktop height */
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --navbar-blue-bg: #145db2;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ------------------------------------- */
/* --- GLOBAL/MOBILE-FIRST STYLES --- */
/* ------------------------------------- */

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: var(--navbar-blue-bg);
  backdrop-filter: none;
  border-bottom: none;
  /* 🔑 FIX 1: Ensure the navbar is always on top of ALL page content */
  z-index: 10000; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem; /* Smaller padding on mobile */
  height: 64px; /* Shorter height on mobile */
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.navbar:hover {
  box-shadow: var(--shadow-lg);
}

/* Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Reduced gap on mobile */
  flex-shrink: 0;
}

/* FIX: Responsive Logo Sizing (Mobile Default) */
.logo-img {
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 50%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: var(--transition);
}

/* Brand Text: Hidden by default on mobile */
.brand-text-container {
  display: none;
}

/* FIX: Header Right Wrapper (Groups Nav and Profile) */
.header-right {
  display: none; /* Default: Hidden on mobile */
  align-items: center;
  gap: 1.5rem;
}

/* Navigation: Hidden by default on mobile */
.navbar-nav {
  display: none; /* Default: Hidden on mobile */
  align-items: center;
  gap: 0.25rem;
}

/* FIX: Fluid Font Size for Links */
.nav-link {
  position: relative;
  /* Scales font between ~14px (0.875rem) and ~18px (1.125rem) */
  font-size: clamp(0.875rem, 1.2vw, 1.125rem);
  padding: 0.75rem 1rem; /* Reduced padding for more space */
  color: var(--white);
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: var(--transition);
  overflow: hidden;
}

/* Remaining .nav-link styles */
.nav-link span {
  position: relative;
  z-index: 1;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--white), var(--primary-light));
  border-radius: 8px;
  opacity: 0;
  transform: scale(0.8);
  transition: var(--transition);
}

.nav-link:hover::before {
  opacity: 0.2;
  transform: scale(1);
}

.nav-link:hover {
  color: var(--primary-light);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: var(--white);
}

.nav-link.router-link-active::before {
  background: linear-gradient(135deg, var(--primary-light), var(--primary-color));
  opacity: 1;
  transform: scale(1);
}

/* Profile Dropdown: Hidden by default on mobile */
.profile-dropdown {
  display: none; /* Default: Hidden on mobile */
  position: relative;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  margin-left: 10px;
  z-index: 10001; /* Ensure dropdown is also high */
}

.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border-color);
}

.arrow {
  font-size: 12px;
  transition: transform 0.2s;
  color: var(--white);
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 50px;
  background: white;
  box-shadow: var(--shadow);
  border-radius: 10px;
  padding: 10px;
  width: 160px;
  z-index: 10002; /* Ensure menu is highest */
}

.user-name {
  text-align: center;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 10px;
}

.logout-btn {
  width: 100%;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-weight: 500;
}

.logout-btn:hover {
  background: #b91c1c;
}

/* Mobile Toggle: Shown by default on mobile */
.mobile-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10002; /* Ensure hamburger is on top */
}
/* Remaining mobile-toggle styles */
.mobile-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--white);
  border-radius: 1px;
  transition: var(--transition);
}

.mobile-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu and Overlay styles */
.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10003; /* Overlay needs to be high */
  backdrop-filter: blur(4px);
}

.mobile-overlay.active {
  opacity: 1;
  display: block;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  max-width: 80vw;
  height: 100vh;
  background: var(--white);
  z-index: 10004; /* Menu must be the highest element */
  display: flex;
  flex-direction: column;
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.mobile-menu.active {
  right: 0;
}
/* Remaining mobile-menu styles */
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-light);
  min-height: var(--navbar-height);
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-logo {
  height: 32px;
  width: auto;
}

.mobile-brand span {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 1.125rem;
}

.mobile-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.mobile-close:hover {
  background: var(--border-color);
  color: var(--text-dark);
}

.mobile-nav {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.mobile-link {
  display: block;
  padding: 1rem 1.25rem;
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: var(--transition);
  border-left: 4px solid transparent;
  position: relative;
}

.mobile-link::before {
  content: '';
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-lighter);
  opacity: 0;
  transition: var(--transition);
}

.mobile-link:hover {
  background: var(--bg-light);
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  padding-left: 1.5rem;
}

.mobile-link:hover::before {
  opacity: 1;
}

.mobile-link.router-link-active {
  background: var(--bg-light);
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  font-weight: 600;
  padding-left: 1.5rem;
}

.mobile-link.router-link-active::before {
  opacity: 1;
  background: var(--primary-color);
}

/* Body padding */
body {
  /* 🔑 FIX 2: Ensure the body has padding equal to the navbar height. This pushes content down. */
  padding-top: var(--navbar-height); 
  margin: 0;
  background: var(--white);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
.nav-link:focus,
.mobile-toggle:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}


/* ------------------------------------- */
/* --- MEDIA QUERY: TABLET/DESKTOP (min-width: 768px) --- */
/* ------------------------------------- */

@media (min-width: 768px) {
  /* Restore original desktop height and padding */
  .navbar {
    height: var(--navbar-height); /* 80px */
    padding: 0 2rem;
  }
  
  /* Update navbar height variable for desktop */
  body {
      padding-top: var(--navbar-height);
  }

  /* Show all desktop elements */
  .header-right,
  .navbar-nav,
  .profile-dropdown {
    display: flex !important;
  }

  /* Hide mobile elements */
  .mobile-toggle {
    display: none !important;
  }

  /* Show Brand Text */
  .brand-text-container {
    display: flex;
  }

  /* Logo size adjustment for desktop */
  .logo-img {
    width: 60px;
    height: 60px;
  }

  /* FIX: Reduce nav link spacing on small desktop/tablet to fit all links on one line */
  .navbar-nav {
      gap: 0; /* Minimal gap between links for maximum space */
      padding-right: 1rem;
  }
}

/* ------------------------------------- */
/* --- MEDIA QUERY: Large Desktop (min-width: 1200px) --- */
/* ------------------------------------- */

@media (min-width: 1200px) {
  /* Restore comfortable gap on very wide screens */
  .navbar-nav {
    gap: 0.5rem;
    padding-right: 0;
  }
}

/* ------------------------------------- */
/* --- MEDIA QUERY: Smallest Mobile (max-width: 480px) --- */
/* ------------------------------------- */

@media (max-width: 480px) {
  .navbar {
    padding: 0 0.75rem;
  }
  .mobile-menu {
    width: 100%;
    max-width: 100vw;
  }
  .mobile-header {
    padding: 1rem;
  }
}
</style>