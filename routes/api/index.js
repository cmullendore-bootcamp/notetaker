const router = require("express").Router();
const apiRoutes = require("./notesApi");

router.use(apiRoutes);

module.exports = router;