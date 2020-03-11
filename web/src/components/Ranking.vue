<template>
	<div>
		<h1>Ranking</h1>
		<div style="padding: 40px">
			<v-card>
				<v-list two-line>
					<template v-for="(item, index) in ranking">
						<v-list-tile
							:key="item.title"
							avatar
							ripple
							@click="toggle()"
						>
							<v-list-tile-content>
								<v-list-tile-title>#{{index + 1}} - {{ item.name }}</v-list-tile-title>
							</v-list-tile-content>
							
							<v-list-tile-action
								:key="index"
							>
								<v-list-tile-action-text>{{ secondsToString(item.time) }}</v-list-tile-action-text>
							</v-list-tile-action>
						</v-list-tile>
						
						<v-divider
							v-if="index + 1 < ranking.length"
							:key="index"
						></v-divider>
					</template>
				</v-list>
			</v-card>
			<v-text-field
				dark
				placeholder="Name"
				v-model="name"
			></v-text-field>
			<v-text-field
				dark
				placeholder="Time"
				v-model="time"
			></v-text-field>
			<v-btn fab dark color="indigo" @click="addRanking">
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
				name: null,
				time: null
			}
		},
		beforeRouteEnter(to, from, next) {
			store.dispatch('getRanking', { id: to.params.id, modelId: to.params.modelId })
				.then(() => next())
				.catch(error => console.log(error));
		},
		methods: {
			addRanking() {
				if (!this.name || !this.time) return;
				
				this.$store.dispatch('addRanking', {
					name: this.name,
					time: this.time,
					id: this.$route.params.id,
					modelId: this.$route.params.modelId
				})
					.then(() => {
						store.dispatch('getRanking', { id: this.$route.params.id, modelId: this.$route.params.modelId })
							.then(() => {
								this.name = null;
								this.time = null;
							})
							.catch(error => console.log(error));
					})
					.catch(error => console.log(error));
			},
			secondsToString(seconds) {
				let h = Math.floor(((seconds % 31536000) % 86400) / 3600);
				let m = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
				let s = (((seconds % 31536000) % 86400) % 3600) % 60;
				return h + ' hours ' + m + ' minutes ' + s + ' seconds';
			}
		},
		computed: {
			ranking() {
				return this.$store.getters.ranking[this.$route.params.modelId];
			}
		}
	}
</script>