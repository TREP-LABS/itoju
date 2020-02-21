import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.post('/', controllers.disease.createDisease);
router.get('/:name', controllers.disease.getDisease);
router.put('/:diseaseId', controllers.disease.updateDisease);

module.exports = router;
