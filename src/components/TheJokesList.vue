<template>
  <v-container>
    <v-row
        dense
        justify="start"
        align="start"
        wrap="wrap"
        v-if="items.length"
    >
      <v-col
          cols="12" sm="12" mb="12" xl="12" lg="12"
          v-for="item in items"
          :key="item.id"
      >
        <v-card
          class="card--wrap"
          :class="{ 'teal lighten-1': item.like, blue: !item.like }"
        >

          <v-card-text class="headline white--text font-weight-bold">
            {{ item.joke }}
          </v-card-text>

          <v-btn
            class="mx-2 like"
            fab
            dark
            small
            :class="{ 'pink': item.like, 'blue lighten-1': !item.like }"
            @click="addLike(item.id)"
        >
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>

          <v-card-actions>
            <v-layout>
              <v-flex
                  class="text-center"
                  justify-center
              >

              </v-flex>
            </v-layout>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="!items.length && !$store.getters.getPreloader">
      <v-col>
        <v-card-text class="text-h2 text-center">
          No jokes found!
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  }),
  computed: {
    items() {
      return this.$store.getters['jokes/getJokes'].filter((item) => item.joke.toLowerCase().indexOf(this.$store.getters['jokes/getSearch']) !== -1);
    },
  },
  methods: {
    getItems() {
      this.$store.dispatch('jokes/getJokes');
    },
    async addLike(id) {
      await this.$store.dispatch('jokes/setLike', id);
    },
  },
  async beforeMount() {
    // delete localStorage.likes;
    await this.getItems();
  },
};
</script>

<style lang="scss" scoped>
  .card--wrap {
    max-width: 600px;
    margin: 0 auto;
  }
  .pagination-wrap {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -100%);
    margin-top: 30px;
  }
  .flex > span:first-child {
    margin-left: 0 !important;
  }
  .text-date {
    font-size: 17px;
    span {
      text-decoration: underline;
    }
  }
  .link-btn {
    text-decoration: none;
  }
  .like {
    display: block;
    margin-left: auto !important;
  }
  .liked {
    background: red !important;
  }
</style>
