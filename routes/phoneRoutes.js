const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phoneController');
const { body, validationResult } = require('express-validator');

const validatePhone = [
  body('model').notEmpty().withMessage('Model é obrigatório.'),
  body('brand').notEmpty().withMessage('Brand é obrigatório.'),
  body('price').isNumeric().withMessage('Price deve ser um número.'),
  body('startDate').isISO8601().withMessage('Date deve estar no formato ISO8601.'),
  body('endDate').isISO8601().withMessage('EndDate deve estar no formato ISO8601.'),
  body('color').notEmpty().withMessage('Color é obrigatório.'),
  body('code').notEmpty().withMessage('Code é obrigatório.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.get('/phone', phoneController.listPhone);

router.post('/phone', phoneController.createPhone);

router.patch('/phone/code/:code', phoneController.updatePhone);

router.delete('/phone/:code', phoneController.deletePhone);

router.get('/deletedPhones', phoneController.listDeletedPhones);

router.get('/phone/code/:code', phoneController.getPhoneByCode);


module.exports = router;
