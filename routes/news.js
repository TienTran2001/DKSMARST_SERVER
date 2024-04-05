const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/news');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const {
  verifyToken,
  isAdmin,
  isCenter,
} = require('../middlewares/verifyToken');

router.get('', controllers.getAllNews);
router.get('/:newsId', controllers.getNews);
router.post(
  '',
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      title: stringReq,
      content: stringReq,
      imageUrl: string,
      source: string,
      status: string,
    })
  ),
  controllers.addNews
);
router.put(
  '/:newsId',
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      title: stringReq,
      content: stringReq,
      imageUrl: string,
      source: string,
      status: string,
    })
  ),
  controllers.updateNews
);
router.put('/views/:newsId', controllers.autoIncrementViews);
router.delete('/:newsId', controllers.deleteNews);

module.exports = router;
