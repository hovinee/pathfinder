import { signCourse } from '@/controllers/courseController'
import { NextRequest } from 'next/server'

/**
 * @swagger
 * /api/sign-course:
 *   post:
 *     tags:
 *      - Course
 *     summary: 강좌 업데이트 - 수강신청
 *     description: update viewers of course
 *     parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Result:
 *                  type: number
 *                  example: 1000
 *       400:
 *         description: bad request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Result:
 *                  type: number
 *                error:
 *                  type: string
 *            examples:
 *              1001:
 *                value:
 *                  Result: 1001
 *                  error: bad request | session expired | invalid param
 *              1300:
 *                value:
 *                  Result: 1300
 *                  error: invalid id format
 *       404:
 *         description: user not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Result:
 *                  type: number
 *                  example: 1001
 *                error:
 *                  type: string
 *                  example: course not found | user not found
 */
export async function POST(req: NextRequest) {
  return signCourse(req)
}
