/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 정보 가져오기
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
 *          사용자 아이디 전달
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
