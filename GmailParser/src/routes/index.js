/**
 * @swagger
 * tags:
 *   name: Index
 *   description: Gmail Parser 
 */

import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Check API Server Start
 *     produces:
 *      - application/json
 *     summary: index
 *     tags: [Index]
 *     parameters:
 *       - in: query
 *         name: id
 *         type: string
 *         enum: [cjung, gglee, etc..]
 *         description: |
 *          Hello Gmail Parser
 *     responses:
 *       200:
 *         description: 성공
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
router.get('/', (req, res, next) => {
  res.send('Hello Gmail Parser');
});

module.exports = router;
