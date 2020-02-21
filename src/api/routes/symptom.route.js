import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.post('/', controllers.symptom.createSymptom);
router.get('/:name', controllers.symptom.getSymptom);
router.put('/:symptomId', controllers.symptom.updateSymptom);
router.post('/match', controllers.symptom.matchSymptom);

module.exports = router;
