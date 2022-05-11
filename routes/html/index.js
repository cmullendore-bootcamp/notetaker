const router = require("express").Router();
const htmlRoutes = require("./notesHtml");

router.use(htmlRoutes);

module.exports = router;