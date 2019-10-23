const express = require('express');
// const yourRouterFile = require('/path/to/your/router/file');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({success: true});
});

// Make modifications here
// router.use(yourRouterFile);

module.exports = router;