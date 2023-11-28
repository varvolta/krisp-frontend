import { randomMinMax } from './random.util'

export const randomItemFromArray = (array) => {
    return array[randomMinMax(0, array.length - 1)]
}

export const randomArrayFromArray = (array, count) => {
    count ||= randomMinMax(1, array.length - 1)
    const indices = []
    for (let i = 0; i < count; i++) {
        const index = randomMinMax(0, array.length - 1)
        if (!indices.includes(index)) {
            indices.push(index)
        } else {
            i--
        }
    }
    return indices.map(index => array[index])
}

export const arrayIncludesArray = (array1, array2) => {
    return array2.every(element => {
        return array1.includes(element)
    })
}