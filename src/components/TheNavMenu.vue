<template>
  <div>
    <v-app-bar
        app
        color="indigo"
        dark
    >
      <v-form class="form">
      <v-text-field
          solo
          label="Поиск"
          append-icon="mdi-card-search"
          class="search"
          v-model="search"
      ></v-text-field>
      </v-form>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    search: '',
  }),
  methods: {
  },
  watch: {
    search(val) {
      this.$store.commit('jokes/setSearch', val);
    },
  },
};
</script>

<style scoped>
header {
  min-height: 64px !important;
}
.search, .form {
  height: 100% !important;
}
.form {
  margin: 0 auto;
  width: 600px;
  max-width: 100%;
}
/*.form {*/
/*  padding: 10px 0;*/
/*}*/
  .v-toolbar__title a {
    color: white;
    text-decoration: none;
  }
  @media screen and (max-width: 360px) {
    .v-btn {
      font-size: 12px;
    }
  }
</style>
<style lang="scss">
.search .v-input__slot {
  background: white !important;
  label {
    color: black;
  }
  input {
    color: black !important;
  }
  .mdi-card-search::before {
    color: rgb(38, 198, 218);
  }
}
</style>
