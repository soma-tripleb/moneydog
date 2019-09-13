import express from 'express';
import SubsTmplService from './subsTmplService';

const router = express.Router();

router.get('/', (req, res) => {
  SubsTmplService.getSubscriptionTemplateList()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/:name', (req, res) => {
  SubsTmplService.getSubscriptionTemplate(req.params.name)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

/**
 * body: Json Data
 */
router.post('/', (req, res) => {
  SubsTmplService.createOne(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/name/:name', (req, res) => {
  SubsTmplService.deleteOne(req.params.name)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

export default router;
