export function hasNullOrUndefined(obj) {
  return Object.values(obj).some(value => value === null || value === undefined)
}

export function getRandomInt(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomHex() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

export function isValidArraySubset(sourceArray, targetArray) {
  if (targetArray == null || sourceArray == null) return false
  return targetArray.every(item => sourceArray.includes(item))
}

export function timeout(milli) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, milli)
  })
}

export function throttle(callback, delay = 1000) {
  let shouldWait = false

  return (...args) => {
    if (shouldWait) return

    callback(...args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}

export function shortenObj(obj, n) {
  return Object.fromEntries(Object.entries(obj).slice(0, n))
}

// Easing functions
export const linear = (t) => t
export const easeInQuad = (t) => t * t
export const easeOutQuad = (t) => t * (2 - t)
export const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
export const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
