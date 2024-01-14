import fs from 'fs'
import path from 'path'
import {
  Experience,
  Footer,
  Main,
  TCourse,
  TDigitalLiteracy,
  TLabKid,
} from '../utils/types'
import { getSlugs } from './util'

const directory = path.join(process.cwd(), 'src/data')
const labkidDirectory = path.join(process.cwd(), 'src/data/labkid')
const courseDirectory = path.join(process.cwd(), 'src/data/courses')

export function getCourseBySlug(
  slug: string,
  fields: Array<keyof TCourse> | 'all',
): TCourse {
  const realSlug = slug.replace(/\.json$/, '')
  const fullPath = path.join(courseDirectory, `${realSlug}.json`)
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8')) as TCourse
  let course: TCourse

  if (fields === 'all') {
    course = { ...fileContents, slug: realSlug }
  } else {
    course = fields.reduce(
      (acc: TCourse, field: keyof TCourse) => {
        if (field === 'slug') {
          return { ...acc, [field]: realSlug }
        }

        if (typeof fileContents[field] !== 'undefined') {
          return {
            ...acc,
            [field]: fileContents[field],
          }
        }
        return acc
      },

      <TCourse>{},
    )
  }

  return {
    ...course,
    path: `/courses/${realSlug}`,
  }
}

export function getallCourses(
  fields: Array<keyof TCourse> | 'all',
  skip = 0,
  limit?: number,
) {
  const slugs = getSlugs(courseDirectory)
  let courses = slugs.map((slug) => getCourseBySlug(slug, fields))

  if (limit) courses = courses.slice(skip, skip + limit)

  return courses
}

export function getFooterData(): Footer {
  const fullPath = path.join(directory, 'footer.json')
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8')) as Footer
  let data: Footer
  data = { ...fileContents }
  return { ...data }
}

export function getMainData(): Main {
  const fullPath = path.join(directory, 'main.json')
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8')) as Main
  let data: Main
  data = { ...fileContents }
  return { ...data }
}

export function getExperienceData(): Experience {
  const fullPath = path.join(directory, 'experience.json')
  const fileContents = JSON.parse(
    fs.readFileSync(fullPath, 'utf8'),
  ) as Experience
  let data: Experience
  data = { ...fileContents }
  return { ...data }
}

export function getLabKidBySlug(slug: string): TLabKid {
  const realSlug = slug.replace(/\.json$/, '')
  const fullPath = path.join(labkidDirectory, `${realSlug}.json`)
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8')) as TLabKid
  let labkid: TLabKid

  labkid = { ...fileContents }

  return {
    ...labkid,
  }
}

export function getDigitalLiteracy(): TDigitalLiteracy[] {
  const fullPath = path.join(directory, 'digital-literacy.json')
  const fileContents = JSON.parse(
    fs.readFileSync(fullPath, 'utf8'),
  ) as TDigitalLiteracy[]
  return [...fileContents]
}

export function getCareerCounseling(): TDigitalLiteracy[] {
  const fullPath = path.join(directory, 'career-counseling.json')
  const fileContents = JSON.parse(
    fs.readFileSync(fullPath, 'utf8'),
  ) as TDigitalLiteracy[]
  return [...fileContents]
}
