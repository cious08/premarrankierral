<template>
  <section class="gallery">
    <div class="overlay"></div> 
    
    <div class="header">
      <h1 style="font-weight: bold;">GALLERY</h1>
      <p>Snapshots of events, activities, and life at Concepcion Holy Cross College.</p>
      
    </div>

    <div class="gallery-grid">
      <div
        class="gallery-item"
        v-for="(image, index) in dynamicImages"
        :key="`dynamic-${index}`"
        @click="openPreview(image, index, 'dynamic')"
      >
        <img :src="image" :alt="`Dynamic Image ${index + 1}`" />
      </div>

      <div
        class="gallery-item"
        v-for="(image, index) in staticImages"
        :key="`static-${index}`"
        @click="openPreview(image, index, 'static')"
      >
        <img :src="image" :alt="`Gallery Image ${index + 1}`" />
      </div>
    </div>

    <div v-if="previewImage" class="image-popup" @click.self="closePreview">
      <div class="popup-content">
        <button class="nav-arrow prev-arrow" @click.stop="navigate('prev')">
          &#10094;
        </button>
        
        <img :src="previewImage" alt="Preview" />
        <button class="close-btn" @click="closePreview">×</button>

        <button class="nav-arrow next-arrow" @click.stop="navigate('next')">
          &#10095;
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";


// A reactive ref for images uploaded via posts, initialized as an empty array
const dynamicImages = ref([]); 

const previewImage = ref(null);
const currentImageIndex = ref(null);

// Computed property to combine both lists for seamless navigation
const allImages = computed(() => [
    ...dynamicImages.value, 
    ...staticImages 
]);


// Load images from localStorage when the component mounts
onMounted(() => {
    try {
        const loadedDynamicImages = JSON.parse(localStorage.getItem('dynamicGalleryImages') || '[]');
        dynamicImages.value = loadedDynamicImages;
    } catch (e) {
        console.error("Could not load dynamic gallery images from localStorage:", e);
    }
});

const openPreview = (image, index, source) => {
  // Calculate the overall index in the combined `allImages` array for navigation
  let overallIndex;
  
  if (source === 'dynamic') {
      // Dynamic images are at the start of the combined array
      overallIndex = index;
  } else {
      // Static images follow the dynamic images
      overallIndex = dynamicImages.value.length + index;
  }
  
  previewImage.value = image;
  currentImageIndex.value = overallIndex;
};

const closePreview = () => {
  previewImage.value = null;
  currentImageIndex.value = null;
};

const navigate = (direction) => {
    const totalImages = allImages.value.length;
    if (totalImages === 0) return;

    let newIndex = currentImageIndex.value;

    if (direction === 'next') {
        // Cycles forward (0, 1, ..., max-1, 0)
        newIndex = (newIndex + 1) % totalImages;
    } else if (direction === 'prev') {
        // Cycles backward (max-1, max-2, ..., 0, max-1)
        newIndex = (newIndex - 1 + totalImages) % totalImages;
    }

    // Update the state
    currentImageIndex.value = newIndex;
    previewImage.value = allImages.value[newIndex];
};
</script>

<style scoped>
/* --------------------------------------------------- */
/* 🔑 GALLERY CONTAINER STYLES (FIXED BACKGROUND & DARK OVERLAY) */
/* --------------------------------------------------- */
.gallery {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  
  /* Background Image Setup: Using college building image */
 background-image: url("/logos/newpic.jpg"); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
  
  overflow-y: auto;
  overflow-x: hidden;
  
  padding: 100px 10%; 
  text-align: center;
  z-index: 1;
}

/* 🔑 Overlay Styles - High opacity (0.9) to darken background significantly */
.overlay {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 46, 0.9); 
  z-index: 2; 
}

/* 🔑 Ensure content is visible above the overlay */
.header, 
.gallery-grid, 
.image-popup {
    position: relative;
    z-index: 3;
}

/* --- TEXT VISIBILITY FIXES --- */
.header h1 {
  color: #ffffff; 
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.header p {
  /* Very light color for maximum readability */
  color: #f0f4ff; 
  font-size: 1.1rem;
}

/* --- Gallery Grid and Item Styles --- */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 50px;
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.gallery-item img:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* ✅ POPUP AND PREVIEW SIZING */
.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85); 
  
  display: flex;
  align-items: center; 
  justify-content: center; 
  
  z-index: 99999; 
  overflow: auto; 
  padding: 10px; 
}

.popup-content {
  position: relative;
  background: #fff;
  border-radius: 10px;
  
  max-width: 90vw; 
  
  padding: 5px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content img {
  display: block; 
  width: auto;
  height: auto;
  
  max-width: 100%;
  /* Final requested height for smaller, contained picture */
  max-height: 70vh; 
  
  border-radius: 5px;
  object-fit: contain; 
}

/* ⬅️➡️ NAVIGATION ARROW STYLING */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3); 
  color: #000;
  border: none;
  border-radius: 50%;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 15; 
  transition: background 0.2s, color 0.2s;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-weight: bold;
}

.nav-arrow:hover {
  background: rgba(255, 255, 255, 0.7);
  color: #333;
}

.prev-arrow {
  left: -60px; /* Position outside the pop-up content box */
}

.next-arrow {
  right: -60px; /* Position outside the pop-up content box */
}

/* ❌ CLOSE BUTTON STYLING */
.close-btn {
  position: absolute;
  top: -15px; 
  right: -15px; 
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  width: 35px;
  height: 35px;
  cursor: pointer;
  z-index: 20; 
}
</style>