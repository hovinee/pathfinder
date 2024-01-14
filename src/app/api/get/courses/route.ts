import { getCourses } from '@/controllers/courseController'
import { NextRequest } from 'next/server'

/**
 * @swagger
 * /api/get/courses:
 *   get:
 *     tags:
 *      - Course
 *     summary: 강좌 전체 조회
 *     description: get all courses
 *     parameters:
 *      - in: query
 *        name: role
 *        schema:
 *          type: string
 *        description: <b>all | author | viewer</b>
 *        required: true
 *      - in: header
 *        name: X-Custom-Auth-Key
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
 *                Data:
 *                  type: object
 *                  properties:
 *                    thumbnailImg:
 *                      type: string
 *                    courseTitle:
 *                      type: string
 *                    courseId:
 *                      type: string
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
 *                  error: bad request
 *              1300:
 *                value:
 *                  Result: 1300
 *                  error: invalid role
 *
 *       401:
 *         description: auth key required | session expired
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
 *                  error: auth key required
 *              1200:
 *                value:
 *                  Result: 1200
 *                  error: session expired
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
 *                  example: user not found
 */
export async function GET() {
  return getCourses()
}
