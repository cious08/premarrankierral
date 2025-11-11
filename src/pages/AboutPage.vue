<template>
  <div class="page-background">
    <div class="overlay"></div> 

    <div class="about-page">
      <section class="about-header">
        <h1>About Us</h1>
        <p>Our Vision, Mission, and Core Values define who we are.</p>
      </section>

      <section class="about-row">
        <div class="about-card">
          <h2>Our Vision</h2>
          <p>
            To become a God-centered learning institution focused on holistic education that forms and educates individuals to be conscientious, compassionate, competent, and committed persons towards the development of a just and humane society. 
          </p>
        </div>

        <div class="about-card">
          <h2>Our Mission</h2>
          <p>
            Concepcion Holy Cross College is an institution for academic and values formation offering relevant learner-centered and value-oriented programs that produce competent persons of character in the service of God and society. 
          </p>
        </div>

        <div class="about-card core-values">
          <h2>Core Values</h2>
          <ul>
            <li>Competence</li>
            <li>Holistic Education</li>
            <li>Compassion</li>
            <li>Commitment</li>
          </ul>
          <p class="motto"><em>Hail to the Cross, our only hope!</em></p>
        </div>
      </section>

      <section
        class="info-section"
        style="
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 20px;
        "
      >

        <section class="categories-section" style="margin: 0; padding: 0;">
          <h2 style="margin: 0;">Categories</h2>
          <div
            class="category-item"
            style="display: flex; align-items: center; gap: 8px; margin-top: 4px;"
          >
            <i class="fas fa-school"></i>
            <span>Private School</span>
          </div>
        </section>

        <section class="location-section" style="margin: 8px 0 0 0; width: 100%;">
          <h2 style="margin: 1rem 0;">Concepcion Holy Cross College Location</h2>
          <div
            class="map-container"
            style="margin: 5px 0 0 0; display: flex; justify-content: flex-start;"
          >
            <img
              src="../assets/img/images/mapchcc.png"
              alt="Holy Cross College Map"
              class="map-image"
              style="width: 500px; border-radius: 10px; display: block;"
            />
          </div>
        </section>

        <section class="contact-section" style="margin-top: 2rem;">
          <h2>Contact Information</h2>

          <div style="margin-top: 1rem;">
            <p>
              <strong>📍 Address:</strong> Concepcion, Philippines, 2316
            </p>
            <p>
              <strong>📞 Mobile:</strong> (045) 923 0747
            </p>
            <p>
              <strong>📧 Email:</strong>
              <a href="mailto:info@chcc.edu.ph">info@chcc.edu.ph</a>
            </p>
          </div>

          <div style="margin-top: 1.5rem;">
            <h3>Websites and Social Links</h3>
            <p>
              <a
                href="https://chcc.edu.ph/"
                target="_blank"
                style="text-decoration: underline; color: #0066cc;"
                >https://chcc.edu.ph/</a
              >
            </p>
          </div>
        </section>

        <section class="hours-section">
          <h2 style="margin: 1rem 0;"><i class="fas fa-clock"></i> Hours</h2>
          <div class="info-item" style="display: flex; align-items: flex-start; gap: 10px;">
            <div>
              <p>{{ isOpen ? 'Open now (7:00 AM - 8:30 PM)' : 'Closed now' }}</p>
              <p class="time-now">Current time: {{ currentTime }}</p>
              <p class="date-now">Current date: {{ currentDate }}</p>
              <p>Open Days: Monday - Saturday</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
const isOpen = ref(false)
const openDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

onMounted(() => {
  const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    currentDate.value = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const hours = now.getHours()
    const day = now.toLocaleDateString('en-US', { weekday: 'long' })
    // School is open Monday–Saturday, 7:00 AM–8:30 PM
    isOpen.value = openDays.includes(day) && hours >= 7 && hours < 20.5
  }

  updateTime()
  setInterval(updateTime, 1000)
})
</script>


<style scoped>
/* --------------------------------------------------- */
/* 🔑 NEW: FIXED BACKGROUND CONTAINER */
/* --------------------------------------------------- */
.page-background {
  /* Fills the whole screen, fixed behind the navbar */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; 
  
  /* Set the background image */
  background-image: url("/logos/newpic.jpg"); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
  
  /* Allows content to scroll */
  overflow-y: auto; 
  z-index: 1;
}

/* 🔑 NEW: Dark Overlay */
.overlay {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* Dark overlay to make text readable */
  background: rgba(15, 23, 46, 0.9); 
  z-index: 2; 
}

/* --------------------------------------------------- */
/* 🔑 UPDATED: ABOUT PAGE CONTENT (Header Cut-off Fix Applied Here) */
/* --------------------------------------------------- */
.about-page {
  font-family: "Poppins", sans-serif;
  color: #fff; 
  background-color: transparent; 
  /* 🛠 FIX: Added margin-top (or padding-top) to push content down past the fixed navbar. */
  padding: 40px 20px;
  padding-top: 100px; /* Adjusted padding-top (e.g., 100px) to ensure header is visible */
  line-height: 1.6;
  position: relative; 
  z-index: 3;
}

.about-header {
  text-align: center;
  margin-bottom: 50px;
}

.about-header h1 {
  font-size: 2.5rem;
  color: #fff; 
  margin-bottom: 10px;
}

.about-header p {
  font-size: 1rem;
  color: #ccc; 
}

/* ===== ROW LAYOUT ===== */
.about-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.about-card {
  flex: 1 1 300px;
  background: #fff;
  padding: 30px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #222; 
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
}

.about-card h2 {
  color: #003366;
  font-size: 1.6rem;
  margin-bottom: 15px;
  border-left: 5px solid #003366;
  padding-left: 10px;
}

.about-card p {
  color: #444;
}

.core-values ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.core-values li {
  margin-bottom: 8px;
  color: #333;
  font-size: 1rem;
}

.motto {
  font-style: italic;
  color: #555;
}

/* ===== CONTACT INFO (Adjusting text colors in the info sections) ===== */
.info-section h2, .contact-section h2 {
    color: #fff !important; 
}
.info-section p, .contact-section p {
    color: #ddd !important; 
}
.contact-section h3 {
    color: #ccc !important;
}

.time-now {
  font-size: 0.95rem;
  color: #ccc !important;
  margin-top: 5px;
}

.date-now {
  font-size: 0.95rem;
  color: #ccc !important;
  margin-top: 3px;
}

.map-section {
  margin-top: 20px;
}

.map-image {
  width: 80%;
  max-width: 700px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.map-image img {
  width: 100%;
  max-width: 700px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* ===== LOCATION SECTION ===== */
.location-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: flex-start;
  text-align: left;
  margin-top: 40px;
}

.location-section h2 {
  font-size: 1.8rem;
  color: #fff; 
  margin-bottom: 15px;
}

.location-section img {
  width: 80%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ===== CATEGORIES SECTION ===== */
.categories-section {
  text-align: left; 
  margin-top: 40px;
  margin-bottom: 20px;
}

.categories-section h2 {
  font-size: 1.8rem;
  color: #fff; 
  margin-bottom: 10px;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  font-size: 1.2rem;
  color: #ccc; 
  font-weight: 500;
}

.category-item i {
  color: #fff; 
  font-size: 1.3rem;
}
.time-info {
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 1rem;
}


/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .about-row {
    flex-direction: column;
    align-items: center;
  }
}
</style>