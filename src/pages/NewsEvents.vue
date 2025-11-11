<template>
  <section class="news-events">
    <div class="overlay"></div> 
    
    <div class="header">
      <h2>NEWS & EVENTS</h2>
    </div>

    <div v-if="posts.length > 0" class="dynamic-posts">
      <div
        v-for="(post, index) in posts"
        :key="'dynamic-' + index"
        class="news-card"
      >
        <div class="news-text">
          <div class="post-header-info">
            <p class="poster-name">
              Posted by: 
              <strong>{{ post.posterName || 'CHCC Admin' }}</strong>
            </p>
            <p class="date">{{ post.date }}</p>
          </div>
          
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>

          <div v-if="post.images && post.images.length" class="post-images">
            <div
              v-for="(img, i) in post.images.slice(0, 4)"
              :key="i"
              :class="{
                'image-wrapper': true,
                'last-image-overlay': i === 3 && post.images.length > 4,
                ['img-' + Math.min(post.images.length, 4)]: true
              }"
              @click="enlargeImage(img, post.images)"
            >
              <img
                :src="img"
                alt="Post Image"
                class="post-img"
              />
              
              <div v-if="i === 3 && post.images.length > 4" class="overlay-count">
                +{{ post.images.length - 4 }}
              </div>
            </div>
          </div>

          <img
            v-else-if="post.image"
            :src="post.image"
            alt="Post Image"
            class="single-inline-img"
            @click="enlargeImage(post.image)" />

          <div class="actions" @click.stop>
            <div
              class="like-container"
              @mouseenter="hoverIndex = 'dynamic-' + index"
            >
              <button @click="toggleLike(post)">
                {{ post.userReaction || 'Like' }}
              </button>
              <div
                v-if="hoverIndex === 'dynamic-' + index"
                class="reaction-popup"
                @mouseleave="hoverIndex = null"
              >
                <span @click="react(post, 'Like')">👍</span>
                <span @click="react(post, 'Heart')">❤️</span>
                <span @click="react(post, 'Care')">🤗</span>
                <span @click="react(post, 'Haha')">😂</span>
                <span @click="react(post, 'Wow')">😮</span>
              </div>
            </div>
            <button @click="toggleComment(post)">Comment</button>
            <button class="delete-btn" @click="deleteDynamicPost(index)">
              Delete
            </button>
          </div>

          <div v-if="post.showComment" class="comment-section">
            <div
              v-for="(cmt, cindex) in post.comments"
              :key="cindex"
              class="comment"
            >
              <span v-if="post.editingComment !== cindex">{{ cmt }}</span>

              <input
                v-if="post.editingComment === cindex"
                v-model="post.newComment"
                @keyup.enter="saveEditedComment(post, cindex)"
              />

              <div style="margin-top: 5px">
                <button
                  v-if="post.editingComment !== cindex"
                  @click="editComment(post, cindex)"
                >
                  Edit
                </button>
                <button
                  v-if="post.editingComment === cindex"
                  @click="saveEditedComment(post, cindex)"
                >
                  Save
                </button>
                <button @click="deleteComment(post, cindex)">Delete</button>
              </div>
            </div>

            <input
              type="text"
              v-model="post.newComment"
              placeholder="Write a comment..."
              @keyup.enter="addComment(post)"
            />
            <button @click="addComment(post)">Post</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="staticPosts.length > 0" class="news-container">
      <div
        v-for="(post, index) in staticPosts"
        :key="'static-' + index"
        class="news-card"
        @click="openGallery(post.galleryKey)"
      >
        <div class="news-text">
          <div class="post-header-info">
            <p class="poster-name">
              Posted by: 
              <strong>{{ post.posterName || 'CHCC Admin' }}</strong>
            </p>
            <p v-if="post.date" class="date">{{ post.date }}</p>
          </div>

          <h2>{{ post.title }}</h2>
          <img
            v-if="post.image"
            :src="post.image"
            :alt="post.title"
            class="single-inline-img"
          />
          <p v-for="(paragraph, i) in post.content" :key="i">{{ paragraph }}</p>
          <div class="actions" @click.stop>
            <div
              class="like-container"
              @mouseenter="hoverIndex = 'static-' + index"
            >
              <button @click="toggleLike(post)">
                {{ post.userReaction || 'Like' }}
              </button>
              <div
                v-if="hoverIndex === 'static-' + index"
                class="reaction-popup"
                @mouseleave="hoverIndex = null"
              >
                <span @click="react(post, 'Like')">👍</span>
                <span @click="react(post, 'Heart')">❤️</span>
                <span @click="react(post, 'Care')">🤗</span>
                <span @click="react(post, 'Haha')">😂</span>
                <span @click="react(post, 'Wow')">😮</span>
              </div>
            </div>
            <button @click="toggleComment(post)">Comment</button>
            <button class="delete-btn" @click="deleteStaticPost(index)">
              Delete
            </button>
          </div>

          <div v-if="post.showComment" class="comment-section">
            <div
              v-for="(cmt, cindex) in post.comments"
              :key="cindex"
              class="comment"
            >
              <span v-if="post.editingComment !== cindex">{{ cmt }}</span>

              <input
                v-if="post.editingComment === cindex"
                v-model="post.newComment"
                @keyup.enter="saveEditedComment(post, cindex)"
              />

              <div style="margin-top: 5px">
                <button
                  v-if="post.editingComment !== cindex"
                  @click="editComment(post, cindex)"
                >
                  Edit
                </button>
                <button
                  v-if="post.editingComment === cindex"
                  @click="saveEditedComment(post, cindex)"
                >
                  Save
                </button>
                <button @click="deleteComment(post, cindex)">Delete</button>
              </div>
            </div>

            <input
              type="text"
              v-model="post.newComment"
              placeholder="Write a comment..."
              @keyup.enter="addComment(post)"
            />
            <button @click="addComment(post)">Post</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal" @click.self="closeGallery">
      <div class="modal-content">
        <span class="close" @click="closeGallery">&times;</span>
        <div class="gallery">
          <img
            v-for="(image, index) in currentImages"
            :key="index"
            :src="image"
            alt="Event photo"
            class="thumbnail"
            @click="enlargeImage(image)"
          />
        </div>
      </div>
    </div>

    <div v-if="enlargedImage" class="image-overlay" @click.self="closeEnlarged">
      <img :src="enlargedImage" alt="Enlarged view" class="large-img" />
      <span class="close" @click="closeEnlarged">&times;</span>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const showModal = ref(false)
const currentImages = ref([])
const enlargedImage = ref(null)
const hoverIndex = ref(null)
const posts = ref([])
const staticPosts = ref([])

onMounted(() => {
  // Load dynamic posts and ensure they have necessary properties
  const loadedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
  
  // Sort the loaded posts to ensure newest (highest date/time) is first
  loadedPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
  });


  posts.value = loadedPosts.map(post => ({
      ...post,
      userReaction: post.userReaction || null,
      comments: post.comments || [],
      newComment: post.newComment || '',
      showComment: post.showComment || false,
      editingComment: post.editingComment || null,
      posterName: post.posterName || 'CHCC Admin', 
  }));

  // Load static posts. 
  const loadedStaticPosts = JSON.parse(localStorage.getItem('staticPosts') || '[]');
  // Optional: Sort static posts too if they also have dates
  loadedStaticPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
  });
  
  staticPosts.value = loadedStaticPosts.map(post => ({
      ...post,
      userReaction: post.userReaction || null,
      comments: post.comments || [],
      newComment: post.newComment || '',
      showComment: post.showComment || false,
      editingComment: post.editingComment || null,
      posterName: post.posterName || 'CHCC Admin',
  }));
})

function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts.value))
  localStorage.setItem('staticPosts', JSON.stringify(staticPosts.value))
}

// Clears the reaction when the main button is clicked
function toggleLike(post) {
  post.userReaction = null; 
  savePosts()
}

function react(post, type) {
  post.userReaction = type
  savePosts()
}
function toggleComment(post) {
  post.showComment = !post.showComment
}
function addComment(post) {
  if (post.newComment.trim() !== '') {
    post.comments.push(post.newComment.trim())
    post.newComment = ''
    savePosts()
  }
}
function editComment(post, index) {
  post.editingComment = index
  post.newComment = post.comments[index]
}
function saveEditedComment(post, index) {
  if (post.newComment.trim() !== '') {
    post.comments[index] = post.newComment.trim()
    post.newComment = ''
    post.editingComment = null
    savePosts()
  }
}
function deleteComment(post, index) {
  if (confirm('Delete this comment?')) {
    post.comments.splice(index, 1)
    savePosts()
  }
}
function deleteDynamicPost(index) {
  if (confirm('Are you sure you want to delete this post?')) {
    const post = posts.value[index];

    // Load current gallery images from localStorage
    let galleryImages = JSON.parse(localStorage.getItem('dynamicGalleryImages') || '[]');

    // Remove images of this post from the gallery
    if (post.image) {
      galleryImages = galleryImages.filter(img => img !== post.image);
    }
    if (post.images && post.images.length > 0) {
      galleryImages = galleryImages.filter(img => !post.images.includes(img));
    }

    // Save updated gallery list
    localStorage.setItem('dynamicGalleryImages', JSON.stringify(galleryImages));

    // Remove the post itself
    posts.value.splice(index, 1);
    savePosts();

    alert('Post and related gallery image(s) deleted.');
  }
}


// GALLERY (Kept for compatibility, but won't be used unless a post loaded from localStorage specifies a galleryKey)
const galleries = {
  clinic: ['/img/clinic.jpg', '/img/clinic1.jpg', '/img/clinic2.jpg'],
  rosary: ['/img/rosary.jpg', '/img/pic1.png', '/img/pic2.jpg']
}
function openGallery(key) {
  currentImages.value = galleries[key] || []
  showModal.value = true
}
function closeGallery() {
  showModal.value = false
}

function enlargeImage(image, imagesArray = null) {
  if (imagesArray) {
    currentImages.value = imagesArray;
    showModal.value = true;
  } else {
    enlargedImage.value = image;
  }
}

function closeEnlarged() {
  enlargedImage.value = null
}
</script>

<style scoped>
/* --------------------------------------------------- */
/* 🔑 NEWS & EVENTS CONTAINER STYLES (BACKGROUND/OVERLAY) */
/* --------------------------------------------------- */
.news-events { 
    /* Set the background image, fixed position, and height */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /* UPDATE THE IMAGE URL HERE IF DIFFERENT FROM LOGIN/SIGNUP */
    background-image: url("/logos/newpic.jpg"); 
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    /* Center the posts within the fixed screen */
    display: flex;
    flex-direction: column; 
    align-items: center; 
    
    /* IMPORTANT: Use a huge padding-top to move content below the fixed navbar */
    padding: 100px 20px 40px; 
    
    /* Allow scrolling of the content */
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1; /* Ensure this section is below the NavBar (z-index 1000) */
}

/* 🔑 OVERLAY STYLES */
.overlay {
    position: fixed; /* Must be fixed, same as parent */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Dark blue/gray background with transparency */
    background: rgba(0, 0, 40, 0.45);
    backdrop-filter: brightness(0.7);
    z-index: 2; /* Sits over the background image but under the content */
}


/* --- CONTENT STYLES ADJUSTED FOR VISIBILITY --- */

/* Ensure content and header are above the overlay */
.header { 
    z-index: 3; 
    width: 100%;
    max-width: 900px;
    margin-bottom: 20px;
    text-align: center; 
}
.header h2 { 
    font-size: 2.5rem; 
    color: #ffffff; /* White text for contrast */
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Shadow for better readability */
    margin-bottom: 20px; 
}

/* Containers must be above the overlay */
.news-container, .dynamic-posts { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    gap: 40px; 
    z-index: 3; /* Must be above the overlay */
    width: 100%;
    max-width: 900px; /* Constraint width */
}

.news-card { 
    max-width: 900px; 
    background: rgba(255, 255, 255, 0.95); /* Slightly transparent white card */
    border-radius: 12px; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
    overflow: hidden; 
    padding: 20px; 
    text-align: left; 
    transition: transform 0.3s, box-shadow 0.3s; 
    cursor: pointer; 
    width: 100%; /* Take full width of its container */
}


/* Base Styles (Kept as-is or slightly adjusted for contrast) */
.news-card:hover { transform: scale(1.02); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }
.news-text h2 { color: #004aad; text-align: left; margin-bottom: 10px; margin-top: 0; }
.news-text p { line-height: 1.6; color: #333; margin-bottom: 10px; text-align: justify; }

/* 🚀 NEW: Container for Poster Name and Date */
.post-header-info {
 margin-bottom: 15px;
 border-bottom: 1px solid #eee;
 padding-bottom: 5px;
}

/* Updated date style (was at the bottom, now moved up) */
.date { 
 font-size: 0.8rem; /* Slightly smaller for the date/time */
 color: #555; 
 margin-top: -10px; /* Pull it closer to the poster name */
 display: block; /* Ensure it is on its own line */
}

.poster-name { 
 font-size: 1rem; 
 color: #444; 
margin-bottom: 5px; /* Reduced margin since date is below */
 text-align: left;
}

/* The rest of the styles remain the same for functionality */
.actions { display: flex; gap: 10px; margin-top: 10px; align-items: center; flex-wrap: wrap; }
.actions button { padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
.actions button:hover { opacity: 0.8; }
.delete-btn { background-color: #e74c3c; color: #fff; }
.delete-btn:hover { background-color: #c0392b; }
.like-container { position: relative; }
.reaction-popup { position: absolute; top: -50px; display: flex; gap: 5px; background: #fff; padding: 5px 10px; border-radius: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.reaction-popup span { font-size: 1.5rem; cursor: pointer; }
.comment-section { margin-top: 10px; text-align: left; }
.comment-section .comment {
 background: #f0f2f5;
 padding: 5px 10px;
 border-radius: 12px;
 margin-bottom: 5px;
 color: #000;
}
.comment-section .comment input {
 color: #000;
}
.comment-section input { width: calc(100% - 60px); padding: 5px 10px; margin-right: 5px; border-radius: 6px; border: 1px solid #ccc; }
.comment-section button { padding: 5px 10px; border-radius: 6px; border: none; background: #1877f2; color: white; cursor: pointer; }
.comment-section button:hover { opacity: 0.9; }

/* 🖼️ SINGLE IMAGE STYLES */
.single-inline-img {
 float: left; 
max-width: 100%;
 height: auto; 
 margin: 0 0 10px 0;
 border-radius: 10px; 
 object-fit: cover; 
 cursor: pointer;
}

/* 🖼️ MULTI-IMAGE CONTAINER STYLES */
.post-images {
 display: grid;
 width: 100%;
 max-height: 450px; /* Max height for the grid */
 overflow: hidden; 
 gap: 5px;
 margin-bottom: 15px;
 border-radius: 10px;
}

/* 🚀 NEW: Image Wrapper for overlay effect */
.image-wrapper {
 position: relative; /* Crucial for overlay positioning */
 overflow: hidden;
 cursor: pointer;
}

/* 🖼️ BASE IMAGE STYLES */
.post-img {
 width: 100%;
height: 100%;
 object-fit: cover;
 cursor: pointer;
 margin: 0;
 padding: 0;
 display: block;
}

/* 🚀 NEW: Overlay for +N Count */
.overlay-count {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
 color: white;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 2.5rem;
 font-weight: bold;
 pointer-events: none; /* Allows click to pass through to the image-wrapper */
}

/* 🖼️ LAYOUT FOR 1 IMAGE (FULL WIDTH) */
.post-images:has(.img-1) {
 grid-template-columns: 1fr;
 grid-template-rows: 1fr;
}
.post-images .img-1 { max-height: 400px; }

/* 🖼️ LAYOUT FOR 2 IMAGES (SIDE-BY-SIDE) */
.post-images:has(.img-2) {
 grid-template-columns: 1fr 1fr;
 grid-template-rows: 1fr;
}
.post-images .img-2 { max-height: 350px; }

/* 🖼️ LAYOUT FOR 3 IMAGES (LEFT: 1 TALL, RIGHT: 2 STACKED) */
.post-images:has(.img-3) {
 grid-template-columns: 2fr 1fr; /* Left image is wider */
 grid-template-rows: repeat(2, 1fr);
}
.post-images .img-3:nth-child(1) {
 grid-column: 1 / 2;
 grid-row: 1 / 3; /* Taller image on the left */
}
.post-images .img-3:nth-child(2) {
 grid-column: 2 / 3;
 grid-row: 1 / 2; /* Top-right image */
}
.post-images .img-3:nth-child(3) {
 grid-column: 2 / 3;
 grid-row: 2 / 3; /* Bottom-right image */
}

/* 🖼️ LAYOUT FOR 4 IMAGES (2X2 GRID) - USED FOR 4 IMAGES, AND THE FIRST 4 OF 5+ */
.post-images:has(.img-4) {
 grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
}
.post-images .img-4 { max-height: 220px; }

/* Media Queries (Updated to include image-wrapper) */
.modal { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.85); display:flex; justify-content:center; align-items:center; z-index:2000; }
.modal-content { background:#fff; padding:20px; border-radius:12px; max-width:80%; max-height:80%; overflow-y:auto; position:relative; }
.gallery { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; }
.thumbnail { width:200px; height:150px; border-radius:10px; object-fit:cover; transition: transform 0.3s; cursor:pointer; }
.thumbnail:hover { transform: scale(1.05); }
.close { position:absolute; top:5px; right:15px; font-size:2rem; cursor:pointer; color:#444; }
.image-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.9); display:flex; justify-content:center; align-items:center; z-index:3000; }
.large-img { max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 0 20px rgba(255,255,255,0.3); }
@media (max-width:768px) {
 .single-inline-img { 
 float:none; 
 display:block; 
 width:100%; 
 margin:0 auto 15px; 
 }
 .modal-content { max-width:95%; }
 .thumbnail { width:45%; height:auto; }
 
 /* Resetting multi-image layout for small screens */
 .post-images {
 grid-template-columns: 1fr !important; /* Single column stack */
 grid-template-rows: auto !important;
 max-height: none;
 }
 .image-wrapper {
 grid-column: 1 / -1 !important;
 grid-row: auto !important;
 max-height: 300px !important;
}
}
</style>