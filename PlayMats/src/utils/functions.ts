import { Mat } from 'src/utils/models'

/**
 * Fetch mat details from json file
 */
export const fetchMat = async (matId: number) => {
  let mat: Mat | null = null
  try {
    const response = await fetch('data/mats.json')

    if (!response.ok) {
      console.error('Failed to fetch mats')
      return null
    }
    const temp = await response.json()
    mat = temp.find((mat: Mat) => mat.id === matId)
    if(!mat) {
      console.error('Mat not found')
      return null
    }
    return mat

  } catch (error) {
    console.error('Failed to fetch mats', error)
    return null
  }
}
