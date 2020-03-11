const router = require('express').Router();

const GameController = require('../controllers/game');
const RunController = require('../controllers/run');
const RankingController = require('../controllers/ranking');

const response = require('../manager/response').getDefaultResponseHandler;

router.get('/', (req, res) => GameController.getAll(response.bind(null, req, res), req));
router.post('/', (req, res) => GameController.create(req.body, response.bind(null, req, res), req));

router.get('/:id/runs', (req, res) => RunController.getAll(req.params.id, response.bind(null, req, res), req));
router.post('/:id/runs', (req, res) => RunController.create(req.params.id, req.body, response.bind(null, req, res), req));

router.get('/:id/runs/:modelId/ranking', (req, res) => RankingController.getAll(req.params.id, req.params.modelId, response.bind(null, req, res), req));
router.post('/:id/runs/:modelId/ranking', (req, res) => RankingController.create(req.params.id, req.params.modelId, req.body, response.bind(null, req, res), req));

module.exports = router;