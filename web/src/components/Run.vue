<template>
    <div>
        <h1>Races</h1>
        <div style="padding: 40px">
            <v-card>
                <v-list two-line>
                    <template v-for="(item, index) in runs">
                        <v-list-tile
                          :key="item.title"
                          avatar
                          ripple
                          @click="toggle(item._id)"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider
                          v-if="index + 1 < runs.length"
                          :key="index"
                        ></v-divider>
                    </template>
                </v-list>
            </v-card>
            <v-text-field
              dark
              v-model="name"
            ></v-text-field>
            <v-btn fab dark color="indigo" @click="addRun">
                <v-icon dark>add</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import store from '../store';
    
    export default {
        data() {
            return {
                name: null
            }
        },
        beforeRouteEnter(to, from, next) {
            store.dispatch('getRuns', to.params.id)
              .then(() => next())
              .catch(error => console.log(error));
        },
        methods: {
            toggle(id) {
                this.$router.push({ name: 'games.runs.ranking', params: { id: this.$route.params.id, modelId: id }});
            },
            addRun() {
                if (!this.name) return;
                
                this.$store.dispatch('addRun', { name: this.name, id: this.$route.params.id })
                  .then(() => {
                      store.dispatch('getRuns', this.$route.params.id)
                        .then(() => this.name = null)
                        .catch(error => console.log(error));
                  })
                  .catch(error => console.log(error));
            }
        },
        computed: {
            runs() {
                return this.$store.getters.runs[this.$route.params.id];
            }
        }
    }
</script>
