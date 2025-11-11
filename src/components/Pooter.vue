<template>
  <footer class="footer">
    <p>
      <a href="https://github.com/cious08/CHCC-school-web.git" target="_blank">
        Visit The Website of Concepcion Holy Cross College Inc.
      </a>
    </p>

    <div class="footer-bottom">
      <p>
        &copy; {{ new Date().getFullYear() }} Concepcion Holy Cross College Inc.. All rights reserved.
        | info@chcc.edu.ph | (045) 923 0747
      </p>
    </div>

    <div class="footer-socials">
      </div>
  </footer>
</template>

<script setup>
</script>

<style scoped> /* Added 'scoped' for safety in Vue components */
.footer {
  /* Set background and initial text color for everything inside */
  background: #0a2c82;
  color: #ffffff; /* Fix 1: Text color is now white */
  padding: 2rem 0 0;
}

.footer p {
    text-align: center; /* Center the top link text */
    margin: 0; /* Remove default paragraph margins */
}

/* Style the top link separately */
.footer p a {
    color: #ffffff;
    text-decoration: none;
}

.footer p a:hover {
    color: #ffd700;
}

.footer-bottom {
  /* This section inherits the background from .footer */
  text-align: center;
  padding: 1rem;
  margin-top: 1rem; /* Use a smaller margin for separation */
  font-size: 0.9rem;
}

.footer-socials {
  /* Inherits background and color from .footer */
  text-align: center;
  padding: 1rem 0;
}

.footer-socials a {
  color: #ffffff; /* Ensure social links are white */
  margin: 0 0.5rem;
  font-size: 1.3rem;
  transition: color 0.2s;
}

.footer-socials a:hover {
  color: #ffd700; /* gold hover effect */
}
</style>