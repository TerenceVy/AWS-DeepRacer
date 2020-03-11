<template>
  <div class="hello">
    <h1>CrazyRacing</h1>
    <router-link v-for="game in games" :key="game._id" :to="{ name: 'games.runs', params: { id: game._id }}"><img :src="'/images/' + game.name + '.png'" :alt="game.name"></router-link>
  </div>
</template>

<script>
  import store from '../store';

export default {
  data() {
    return {

    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('getGames')
      .then(() => {
        next();
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    games() {
      return this.$store.getters.games;
    }
  }
}
</script>

<style scoped>
img {
  margin: 40px 80px 20px;
  width: 350px;
  height: 350px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
