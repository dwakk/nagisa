<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, onMounted } from 'vue';
import { fetchMutualGuilds, fetchUserData } from '../utils/api';
import { PartialGuild, User } from '@/types';
import { generateHeaders } from '../utils/middleware';
import { mobileMenu } from "@/assets/mobileMenuMenu";

const headers = generateHeaders(document)

const mutualGuilds = ref<PartialGuild[]>([]);
const adminGuilds = ref<PartialGuild[]>([]);
const isLoading = ref(true);
const user = ref<User>({ avatar: "", global_name: "", id: "", icon: "" })

function showPage() {
  const loaderElement = document.getElementById("loader");
  const pageElement = document.getElementById("page");
  if (loaderElement && pageElement) {
    loaderElement.style.display = "none";
    pageElement.style.display = "block";
  }
}

async function loadData() {
  try {
    const response = await fetchMutualGuilds(headers);
    console.log(response.data)
    const { data } = await fetchUserData(headers)
    const { avatar, global_name, id } = data as User;
    const icon = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
    user.value = { avatar, global_name, id, icon }

    mutualGuilds.value = response.data.adminNoBot;
    adminGuilds.value = response.data.mutualAdminGuilds;
    isLoading.value = false;
    showPage();
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
}

function addBot(guild: PartialGuild) {
  const encodedURI = encodeURIComponent("http://localhost:3000/api/discord")
  const link = `https://discord.com/api/oauth2/authorize?client_id=1104460281163292764&permissions=10191289838934&scope=bot&guild_id=${guild.id}&redirect_uri=${encodedURI}&response_type=code`
  const openedWindow = window.open(link, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");

  const checkClosed = setInterval(() => {
    if (openedWindow?.closed) {
      clearInterval(checkClosed)
      window.location.href = `http://localhost:5173/dashboard/${guild.id}`
    }
  }, 1000)
}

onMounted(() => {
  mobileMenu()
  loadData()
});
</script>

<style scoped>
@import url("@/assets/dashboard.css");
@import url("@/assets/home.css");
</style>

<template>
  <div id="loader" v-if="isLoading">
    <div class="loading">
      <span></span>
    </div>
  </div>
  <div id="page">

    <nav>
      <router-link to="/">
        <div class="logo noselect">
          <img class="noselect" src="@/assets/nagisa.jpg" alt="Logo" /> Nagisa
        </div>
      </router-link>

      <div class="openMenu noselect">
        <FontAwesomeIcon icon="fas fa-bars" />
      </div>
      <ul class="mainMenu noselect">
        <li>
          <router-link to="/" class="router-link">
            <FontAwesomeIcon icon="fas fa-home" /> Accueil
          </router-link>
        </li>
        <li>
          <router-link to="/doc" class="router-link">
            <FontAwesomeIcon icon="far fa-list-alt" /> Documentation
          </router-link>
        </li>
        <li>
          <button class="login-btn">
            {{ user.global_name }}
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          </button>
        </li>
        <div class="closeMenu noselect">
          <FontAwesomeIcon icon="fas fa-times" />
        </div>
      </ul>
    </nav>


    <div class="content noselect">
      <div class="container">
        <h1 style="padding-top: 10%;">Select a server</h1>
        <div class="guilds-grid">
          <div class="guild-container" v-for="guild in adminGuilds" :key="guild.id">
            <div class="img-container">
              <div class="img-background"
                :style="`background: url(https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}); max-width: 100%; display: block;`"></div>
              <img class="img-icon" :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`">
            </div>
            <div class="text-container">
              <div style="margin-right: 12px;">
                <h3 class="guild-name">{{guild.name}}</h3>
                <div style="text-align: left;">Owner</div>
              </div>
              <button v-on:click="addBot(guild)" class="add-button overflow-hidden items-center shrink-0 flex relative">
                <div class="flex flex-grow justify-center max-w-full">
                  <span class="whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center text-white">Setup</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>
