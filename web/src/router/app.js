import BaseRouter from './base';

import GameComponent from '../components/Game';
import RunComponent from '../components/Run';
import RankingComponent from '../components/Ranking';

const router = new BaseRouter([
	{
		path: '/games', component: GameComponent, name: 'index.games'
	},
	{
		path: '/games/:id/runs', component: RunComponent, name: 'games.runs'
	},
	{
		path: '/games/:id/runs/:modelId/ranking', component: RankingComponent, name: 'games.runs.ranking'
	}
]);

export default router;