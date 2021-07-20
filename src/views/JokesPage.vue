<template>
  <v-app id="inspire">
    <TheNavMenu/>

    <v-main>
      <div
        v-show="preloader"
        class="progress-wrap">
        <v-progress-circular
            :size="70"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </div>
      <router-view></router-view>
    </v-main>
    <v-footer
        color="indigo"
        app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheNavMenu from '../components/TheNavMenu.vue';

export default {
  props: {
    source: String,
  },
  data: () => ({
  }),
  computed: {
    preloader() {
      return this.$store.state.preloader;
    },
  },
  components: {
    TheNavMenu,
  },
  mounted() {
    console.log(process.env.VUE_APP_API_URL);
  },
};
</script>

<style lang="scss">
.progress-wrap {
  position: relative;
  & > div {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
