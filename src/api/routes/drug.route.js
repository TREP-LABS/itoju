import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.post('/', controllers.drug.createDrug);
router.get('/:name', controllers.drug.getDrug);
router.put('/:drugId', controllers.drug.updateDrug);
router.post('/match', controllers.drug.matchDrug);

module.exports = router;
