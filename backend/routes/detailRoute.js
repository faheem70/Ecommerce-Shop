const express = require('express');
const { detailCreate, getDetails } = require('../controllers/detailController');
const router = express.Router();

router.route('/detail').post(detailCreate);
router.route('/detailget/:id').get(getDetails);
module.exports = router;