<template>
  <section class="programs">
    <div class="overlay"></div>

    <div class="program-list">
      <h4>PROGRAMS</h4>
      <h2>
        Student Programs<br />
        CHCC Offered
      </h2>
      <ul>
        <li
          v-for="program in programs"
          :key="program.name"
          :class="{ active: activeProgram.name === program.name }"
          @mouseenter="setActiveProgram(program)"
        >
          {{ program.name }}
        </li>
      </ul>
    </div>

    <div class="program-display">
      <img :src="activeProgram.image" :alt="activeProgram.name" />
      <div class="program-text">
        {{ activeProgram.text }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";

const programs = reactive([
  {
    name: "Elementary",
    image: "/logos/elem.jpg",
    text: "Our Elementary Program nurtures young minds with a strong foundation in academics, creativity, and character development.",
  },
  {
    name: "Junior High School",
    image: "/logos/high.jpg",
    text: "Our Junior High School Program empowers students with critical thinking, independence, and strong academic skills to prepare them for high school success.",
  },
  {
    name: "Senior High School",
    image: "/logos/senior.jpg",
    text: "Our Senior High School Program equips students with advanced knowledge, leadership skills, and career or college readiness for a successful future.",
  },
  {
    name: "College",
    image: "/logos/dept.png",
    text: "Our College Program offers specialized courses and hands-on learning to prepare students for professional careers and lifelong success.",
  },
]);

const activeProgram = ref({
  name: "Be a Crossian!",
  image: "/logos/holy.jpg",
  text: "Be a Crossian! Join Concepcion Holy Cross College, Inc.—where excellence is nurtured from Preschool to College. With strong values, academic rigor, and a supportive community, we empower every learner to grow in character and competence.",
});

function setActiveProgram(program) {
  activeProgram.value = program;
}
</script>

<style scoped>
/* --------------------------------------------------- */
/* 🔑 PROGRAMS CONTAINER STYLES (FIXED BACKGROUND) */
/* --------------------------------------------------- */
.programs {
  /* Remove old position/padding/gap and make it fill the screen */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Full viewport height */
  
  /* Background Image Setup */
  background-image: url("/logos/newpic.jpg"); /* **UPDATE IMAGE PATH HERE** */
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Makes the background scroll independently */
  
  /* Content positioning and padding */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  padding: 80px 10%; /* Ensure content has padding */
  
  font-family: "Poppins", sans-serif;
  gap: 60px;
  flex-wrap: wrap;
  
  color: #fff;
  overflow-y: auto; /* Allows content to scroll if it exceeds screen height */
  z-index: 1;
}

/* Background overlay for readability */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Adjusted overlay for better contrast */
  background: rgba(15, 23, 46, 0.8); /* Slightly darker overlay */
  z-index: 0;
}

.program-list,
.program-display {
  position: relative;
  z-index: 1; /* Keep content above the overlay */
  /* Added margin for breathing room when scrolling on small screens */
  margin-top: 20px;
  margin-bottom: 20px;
}

/* Left Section */
.program-list {
  flex: 1;
  min-width: 280px;
}

.program-list h4 {
  font-size: 14px;
  letter-spacing: 2px;
  color: #b5c0e0;
  text-transform: uppercase;
}

.program-list h2 {
  font-size: 36px;
  color: #ffffff;
  margin: 10px 0 30px;
  line-height: 1.3;
  font-weight: 700;
}

.program-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.program-list li {
  font-size: 20px;
  color: #cbd5f0;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.program-list li:hover {
  color: #ffd369;
  transform: translateX(6px);
}

.program-list li.active {
  color: #ffd369;
  font-weight: bold;
}

/* Right Section */
.program-display {
  flex: 1;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.program-display img {
 width: 100%;
 max-height: 450px; 
 object-fit: contain; /* <--- Use 'contain' to ensure the WHOLE image fits */
 border-radius: 12px;
box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
 margin-bottom: 20px;
}

.program-text {
  background-color: rgba(255, 255, 255, 0.15);
  color: #f8fafc;
  padding: 20px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.7;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.program-text:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

/* Media Query for smaller screens */
@media (max-width: 768px) {
    .programs {
        /* On small screens, stack the items and ensure full padding */
        align-items: flex-start;
        padding: 40px 5%; 
    }
}
</style>