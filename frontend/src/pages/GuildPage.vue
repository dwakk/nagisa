<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchGuild } from '../utils/api';
import { useRoute } from 'vue-router';
import { Guild } from '../types';
import { generateHeaders } from '../utils/middleware';

const headers = generateHeaders(document)

const route = useRoute();
const id = route.params.guildId.toString();

const isLoading = ref(true)

const guild = ref<Guild>();

const notFound = ref<boolean>(false)

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
    const {data} = await fetchGuild(headers, id);
    data ? null : (notFound.value = true)
    guild.value = data;
    isLoading.value = false
    showPage()
  } catch (error) {
    notFound.value = true
    isLoading.value = false
    showPage()
  }
}

onMounted(loadData);
</script>

<template>
    <div id="loader" v-if="isLoading">
      <div class="loading">
        <span></span>
      </div>
    </div>

    <div id="page">

      <div class="error" v-if="notFound">
        guild not found
      </div>

      <div class="content noselect">
        <div class="heading text center">
          <img id="botLogo" class="noselect" :src="guild?.icon"/>
          <h1 class="title">{{ guild?.name }}</h1>
        </div>
      </div>
    </div>
</template>