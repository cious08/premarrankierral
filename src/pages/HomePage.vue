<template>
  <div>
    <!-- ===== FRONT PAGE SECTION ===== -->
<section class="front-page">
  <video autoplay muted loop playsinline class="background-video">
    <source src="/logos/droneshot.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div class="overlay"></div>


      <!-- ✅ BUTTONS ADDED HERE -->
      <div class="action-buttons">
        <button class="subscribe-btn" @click="goToCHCC">🔔 Subscribe</button>
        <button class="liked-btn" @click="goToCHCC">👍 Liked</button>
        <button class="message-btn" @click="goToCHCC">✉️ Message</button>
      </div>

      <div class="content">
        <h1>Welcome to,</h1>
        <h2>Concepcion</h2>
        <h2>Holy Cross College, Inc.</h2>
      </div>
    </section>
    

    <!-- ===== HISTORY OF CHCC SECTION ===== -->
    <section class="history-section">
      <div class="intro">
        <h2 class="title">History of CHCC</h2>
        <p class="subtitle">Our legacy of faith, knowledge, and service.</p>
        <hr class="divider" />
      </div>

      <div class="history-content">
        <div class="text-box">
          <div class="brief-history">
            <h3>Brief History of the School</h3>
            <p>
              The school was founded by Mr. Pablo Lansangan Tioseco Sr. who was educated by the Jesuits of Ateneo de Manila.
              From the Jesuits, he learned the true value of getting a good quality education. With this conviction in his
              mind and heart, he brought his ten (10) daughters for schooling at Assumption Convent, which was the Alma Mater
              of his wife, Gloria Y. Pineda. An exclusive school for girls, this school was managed by German Sisters who were
              known for being good disciplinarians. His two (2) sons attended an exclusive technical school for boys, managed
              by foreign priests.
            </p>
            <br />
            <p>
              During his regular visits to this town, he would see from his window, many boys and girls in high school uniforms
              getting public rides to get home. Seeing this, he often asked himself and wondered how and where all these
              children could get a higher education that they deserved, an education that would open doors for them to have a
              good future and better quality of life.
            </p>
            <br />
            <p>
              He tapped his second eldest daughter, Raquel, who had been in the academe for 18 years, and was then the President
              of Holy Cross College, Sta. Rosa Nueva Ecija. He explained to her his dream of providing higher education to high
              school graduates for them to gain opportunities for a better future and as payback time for God’s graces for the
              insurmountable blessings and goodness to his family.
            </p>
            <br />
            <p>
              In school year of 1995 – 1996, the school opened its doors to welcome 75 students and just a handful of employees.
            </p>
            <br />
            <p>
              After almost 30 years of fruitful existence coupled with hard work and dedicated service, Concepcion Holy Cross
              College, Inc., a non-stock, non-profit corporation and founded by a man with the passion and genuine spirit of
              sharing God’s bountiful blessings, now boasts of a strong 2,660 students population and five (5) concrete, 3 – 4
              storey buildings. The school has been offering pre-school, elementary and secondary education and is now on its
              K-12 programme as mandated by the government.
            </p>
            <br />
            <p>
              Concepcion Holy Cross College, Inc., offers CHED recognized Bachelor degree courses in Criminal Justice
              (Criminology and Industrial Security Management), Elementary and Secondary Education, Computer Science, Business
              Administration, Hospitality Management, Accountancy, and Technical/Vocational Courses (Tech-Voc) recognized by
              TESDA. The newest program offered are the degree course in Nursing.
            </p>
          </div>

          <!-- ✅ AUTHOR BOX -->
          <div class="author-box">
            <img :src="raquel" alt="President and Managing Director" class="author-img" />
            <div>
              <h4>RAQUEL T. STA. INES, Ph.D</h4>
              <p>President and Managing Director</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CAMPUS SECTION ===== -->
    <section class="campus-section">
      <h2>Explore Our Campus</h2>

      <div class="gallery">
        <div v-for="(image, index) in campusImages" :key="index" class="gallery-item">
          <img
            :src="image.src"
            :alt="image.alt"
            class="gallery-img"
            @mouseover="hoverImage = index"
            @mouseleave="hoverImage = null"
            :class="{ hovered: hoverImage === index }"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

// ✅ Use public folder paths (fix imports)
const holy = "/logos/holy.jpg";
const raquel = "/logos/director.png";

// ✅ Campus Images
const campusImages = [
  { src: "/logos/a.jpg", alt: "Main Building" },
  { src: "/logos/harap.jpg", alt: "Chcc Front" },
  { src: "/logos/front.jpg", alt: "harap" },
  { src: "/logos/monte.jpg", alt: "Monte" },
  { src: "/logos/ab.jpg", alt: "Ab Building" },
  { src: "/logos/tesda.jpg", alt: "Tesda Building" },
  { src: "/logos/lb.jpg", alt: "Lb Building" },
  { src: "/logos/c.jpg", alt: "Library" },
  { src: "/logos/logos/1.1.jpg", alt: "Nursing" },
  { src: "/logos/1111.jpg", alt: "Nursing" },
  { src: "/logos/111.jpg", alt: "Library" },
  { src: "/logos/logos/1.3.jpg", alt: "Library" },
  { src: "/logos/logos/1.4.jpg", alt: "Library" },
  { src: "/logos/logos/1.6.jpg", alt: "AB Building" },
  { src: "/logos/logos/1.7.jpg", alt: "Gym" }
];

const hoverImage = ref(null);

const goToCHCC = () => {
  window.open("https://chcc.edu.ph", "_blank");
};
</script>

<style scoped>
@font-face {
  font-family: 'Broadway';
  src: url('/fonts/Broadway.ttf') format('truetype');
}
/* ===== FRONT PAGE ===== */
.front-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}
/* Slight dark layer to make text readable */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Adjust opacity for brightness */
  z-index: -1;
}

.content h1, .content h2, .content h3 {
  margin: 0.3rem 0;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.6);
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  filter: brightness(1.3); /* Increase brightness — try 1.2 to 1.5 */
}


/* ===== BUTTONS ===== */
.action-buttons {
  position: absolute;
  top: 40%;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10;
}

.action-buttons button {
  background-color: #0f2346;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.action-buttons button:hover {
  background-color: #007bff;
  transform: scale(1.05);
}

/* ===== TEXT CONTENT ===== */
.content h1,
.content h2,
.content h3 {
  margin: 0.4rem 0;
  font-family: 'Broadway', sans-serif;
  font-weight: 900;
  color: white; /* inner text color */
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 2.5rem;

  /* 🧠 Outline effect */
  -webkit-text-stroke: 2px #0047AB; /* blue outline */
  text-stroke: 2px #0047AB;

  /* 💫 Shadow for 3D depth */
  text-shadow:
    2px 2px 8px rgba(0, 71, 171, 0.6),
    0 0 15px rgba(0, 71, 171, 0.4);
  
  transition: all 0.3s ease;
}

/* Middle line emphasis */
.content h2 {
  font-size: 3.2rem;
  -webkit-text-stroke: 2.5px #003b8e;
}

/* Hover shine */
.content h1:hover,
.content h2:hover,
.content h3:hover {
  color: #f0f6ff;
  text-shadow:
    0 0 20px #0056D2,
    0 0 35px rgba(0, 86, 210, 0.8);
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
/* ===== HISTORY SECTION ===== */
.history-section {
  background-color: #9da0a3;
  color: #0f2346;
  font-family: "Arial", sans-serif;
  padding: 60px 20px;
  text-align: center;
}

.history-section .intro {
  margin-bottom: 40px;
}

.history-section .title {
  font-size: 36px;
  font-weight: 800;
}

.history-section .subtitle {
  font-size: 18px;
  color: #555;
}

.history-section .divider {
  width: 60%;
  margin: 20px auto;
  border-top: 2px solid #0f2346;
}

.history-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}

.text-box {
  text-align: justify;
  color: #222;
  font-size: 16px;
  line-height: 1.8;
}

.text-box h3 {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #0f2346;
  margin-bottom: 15px;
}

.author-box {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.author-img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #0f2346;
}

/* ===== CAMPUS SECTION ===== */
.campus-section {
  padding: 60px 20px;
  background-color: #f4f4f4;
  font-family: sans-serif;
  text-align: center;
}

.campus-section h2 {
  font-size: 36px;
  margin-bottom: 30px;
  color: #0f2346;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  max-width: 1100px;
  margin: auto;
}

.gallery-item {
  flex: 0 1 calc(33.333% - 25px);
}

.gallery-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.gallery-img.hovered {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
