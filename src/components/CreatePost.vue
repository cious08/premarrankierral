<template>
  <div class="page-background">
    <div class="overlay"></div> 

    <div class="create-post-container">
      <h1>Create a Post</h1>

      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label>Title:</label>
          <input type="text" v-model="title" required />
        </div>

        <div class="form-group">
          <label>Content:</label>
          <textarea v-model="content" required></textarea>
        </div>

        <div class="form-group">
          <label>Upload Images (optional):</label>
          <input ref="fileInput" type="file" accept="image/*" multiple @change="handleImages" />
          
          <div v-if="imagePreviews.length" class="image-preview">
            <div 
              v-for="(img, index) in imagePreviews" 
              :key="index"
              class="preview-item"
            >
              <img :src="img" alt="Image Preview" :key="index"/>
              <button 
                type="button" 
                class="remove-img-btn" 
                @click="removeImage(index)"
              >
                &times;
              </button>
            </div>
          </div>
        </div>

        <button type="submit" class="post-btn">Post</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const imageFiles = ref([]) 
const imagePreviews = ref([]) 
const fileInput = ref(null)
const router = useRouter() 

const getLoggedInUserName = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  
  if (user) {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.username) {
      return user.username;
    }
    if (user.name) {
      return user.name;
    }
  }
  
  return 'Anonymous User'; 
}

// Resize & compress image aggressively (600px, 0.6 quality)
const resizeImage = (file, maxWidth = 600, quality = 0.6) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const handleImages = async (event) => {
  try {
    const selectedFiles = Array.from(event.target.files || [])
    if (!selectedFiles.length) return

    imageFiles.value = imageFiles.value.concat(selectedFiles)

    const results = await Promise.all(selectedFiles.map(f => resizeImage(f)))
    imagePreviews.value.push(...results)

    if (fileInput.value) fileInput.value.value = ''
  } catch (err) {
    console.error('handleImages error:', err)
    alert('Error loading images. See console for details.')
  }
}

const removeImage = (index) => {
  imagePreviews.value.splice(index, 1);
  imageFiles.value.splice(index, 1);
};

// 🔑 NEW FUNCTION: Attempts to remove the oldest post to free up space
const removeOldestPost = () => {
    try {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        if (posts.length === 0) {
            console.warn('No posts to remove for cleanup.');
            return false;
        }

        // The oldest post is the first element (index 0)
        const oldestPost = posts[0];
        
        // 1. Remove images from dynamic gallery 
        if (oldestPost.images && oldestPost.images.length > 0) {
            let gallery = JSON.parse(localStorage.getItem('dynamicGalleryImages') || '[]');
            const imagesToRemove = oldestPost.images;
            gallery = gallery.filter(img => !imagesToRemove.includes(img));
            localStorage.setItem('dynamicGalleryImages', JSON.stringify(gallery));
        }

        // 2. Remove the oldest post itself
        posts.splice(0, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        
        console.log(`[Storage Cleanup] Successfully removed oldest post.`);
        return true;

    } catch (e) {
        console.error('Failed to perform cleanup:', e);
        return false;
    }
};

// 🔑 NEW FUNCTION: Encapsulates the save logic for retries
const attemptSave = (newPost) => {
    let posts = JSON.parse(localStorage.getItem('posts') || '[]');
    let gallery = JSON.parse(localStorage.getItem('dynamicGalleryImages') || '[]');
    
    // Save posts
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Save gallery images
    if (newPost.images.length > 0) {
        gallery.unshift(...newPost.images);
        localStorage.setItem('dynamicGalleryImages', JSON.stringify(gallery));
    }
    return true; 
}


const submitPost = async () => {
  try {
    const userName = getLoggedInUserName(); 

    const newPost = {
      title: title.value,
      content: content.value,
      posterName: userName, 
      images: imagePreviews.value.slice(), 
      date: new Date().toLocaleString()
    }

    let saveSuccessful = false;
    let cleanupAttempts = 0;
    const MAX_CLEANUP_ATTEMPTS = 5; 

    while (!saveSuccessful && cleanupAttempts <= MAX_CLEANUP_ATTEMPTS) {
        try {
            attemptSave(newPost);
            saveSuccessful = true; // Save succeeded
        } catch (err) {
            // Check specifically for QUOTA_EXCEEDED_ERR 
            if (err.name === 'QuotaExceededError' || err.code === 22) {
                if (cleanupAttempts < MAX_CLEANUP_ATTEMPTS && removeOldestPost()) {
                    console.log(`Attempting to free space... Retry ${cleanupAttempts + 1}`);
                    cleanupAttempts++;
                } else {
                    // Cleanup failed or max attempts reached
                    console.error('localStorage save failed after cleanup attempts:', err)
                    alert('Saving failed — Storage full and cleanup failed. Use fewer/smaller images.')
                    return; 
                }
            } else {
                // Other unexpected error
                console.error('localStorage save failed (non-quota error):', err)
                alert('An unexpected error occurred during save. See console for details.')
                return;
            }
        }
    }
    
    if (!saveSuccessful) {
        alert('Saving failed — Maximum cleanup attempts reached. Storage remains full.');
        return;
    }


    alert('Post created successfully!')

    // Clear form
    title.value = ''
    content.value = ''
    imageFiles.value = []
    imagePreviews.value = []
    if (fileInput.value) fileInput.value.value = ''
    router.push('/news')
  } catch (err) {
    console.error('submitPost unexpected error:', err)
    alert('An unexpected error occurred. See console for details.')
  }
}
</script>

<style scoped>
/* --------------------------------------------------- */
/* 🔑 FIXED BACKGROUND CONTAINER */
/* --------------------------------------------------- */
.page-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; 
    
    /* Requested Background Image */
    background-image: url("/logos/newpic.jpg"); 
    background-size: cover;
    background-position: center;
    background-attachment: fixed; 
    
    overflow-y: auto; 
    padding: 0; 
    
    /* Centers the form perfectly */
    display: flex; 
    justify-content: center; 
    align-items: center; 
    
    z-index: 1;
}

/* 🔑 Dark Overlay */
.overlay {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Dark overlay matching the gallery/login background */
    background: rgba(15, 23, 46, 0.9); 
    z-index: 2; 
}

/* --------------------------------------------------- */
/* 🔑 FORM CONTAINER (Ensures form is centered and readable) */
/* --------------------------------------------------- */
.create-post-container {
  max-width: 600px;
  margin: 0; 
  
  padding: 30px; 
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4); 
  color: #111; 
  z-index: 3; 
  position: relative;
  
  max-height: 90vh;
  overflow-y: auto; 
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.post-btn {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.post-btn:hover {
  background: #1e7e34;
}

/* --------------------------------------------------- */
/* 🔑 IMAGE PREVIEW STYLES */
/* --------------------------------------------------- */
.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

/* Container for positioning the X button */
.preview-item {
    position: relative;
    width: 100px; 
    height: 100px; 
}

.image-preview img {
  width: 100%; 
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* X button style */
.remove-img-btn {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4444; 
    color: white;
    border: none;
    border-radius: 50%; 
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 1;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
    z-index: 5; 
}

.remove-img-btn:hover {
    background: #cc0000;
}
</style>