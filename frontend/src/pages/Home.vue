<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted } from "vue";
import { fetchStatus } from '../utils/api';
import { generateHeaders } from '../utils/middleware';
import { mobileMenu } from "@/assets/mobileMenuHome"

const headers = generateHeaders(document)


function showPage() {
   const loaderElement = document.getElementById("loader");
   const pageElement = document.getElementById("page");
   if (loaderElement && pageElement) {
      loaderElement.style.display = "none";
      pageElement.style.display = "block";
   }
}

function loaderFunction() {
   setTimeout(showPage, 1400);
}


async function handleLogin() {
   if (headers.Cookie.length === 0) {
      window.location.href = "http://localhost:3000/api/auth/discord"
   } else {
      window.location.href = await fetchStatus(headers)
   }
}

function scrollToFeatures() {
   const features = document.getElementById("features");
   if (features) {
      window.scrollTo({
         top: features.offsetTop,
         behavior: "smooth",
      });
   }
}

onMounted(() => {
   loaderFunction();
   scrollToFeatures();
   mobileMenu()
});
</script>

<style scoped>
@import url("@/assets/home.css");
@import url("@/assets/global.css");
</style>

<template>
   <div id="loader">
      <div class="loading">
         <span></span>
      </div>
   </div>
   <div id="page">
      <nav>
         <a href="#">
            <div class="logo noselect">
               <img class="noselect" src="@/assets/nagisa.jpg" alt="Logo" /> Nagisa
            </div>
         </a>

         <div class="openMenu noselect">
            <FontAwesomeIcon icon="fas fa-bars" />
         </div>
         <ul class="mainMenu noselect">
            <li>
               <router-link to="/dashboard" class="router-link">
                  <a class="active">
                     <FontAwesomeIcon icon="fas fa-home" /> Accueil
                  </a>
               </router-link>
            </li>
            <li>
               <a class="active" href="#">
                  <FontAwesomeIcon icon="far fa-list-alt" /> Documentation
               </a>
            </li>
            <li>
               <a class="login-btn" @click="handleLogin()">
                  <FontAwesomeIcon icon="fas fa-arrow-right-to-bracket" /> Connexion
               </a>
            </li>
            <div class="closeMenu noselect">
               <FontAwesomeIcon icon="fas fa-times" />
            </div>
         </ul>
      </nav>

      <div class="content noselect">
         <div class="heading text-center">
            <img id="botLogo" class="noselect" src="@/assets/nagisa.jpg" alt="botLogo" />
            <h1 class="title">Nagisa</h1>
            <p class="subtitle">Le meilleur bot multifonction pour votre serveur.</p>

            <br />
            <a class="btn btn-primary" href="#" target="_none" role="button">
               <FontAwesomeIcon icon="fab fa-discord" /> Ajouter le bot
            </a>
            <a class="btn btn-secondary" href="#" role="button">
               <FontAwesomeIcon icon="far fa-list-alt" /> Documentation
            </a>

            <div class="floating-icon">
               <a @click="scrollToFeatures()">
                  <FontAwesomeIcon icon="fas fa-circle-chevron-down" size="xl" />
               </a>
            </div>
         </div>
      </div>

      <section id="features" class="section mt-6">
         <div class="has-text-centered">
            <h1 class="title lined">Fonctionnalités</h1>
         </div>
      </section>
   </div>
</template>

<style>
@import url("@/assets/dashboard.css");
</style>

<script lang="ts">
export default {}

</script>@/assets/mobileMenu@/assets/mobileMenuHome