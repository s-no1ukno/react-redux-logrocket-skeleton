/* eslint-disable */

import { cloneDeep, isEqual } from 'lodash'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
// UTIL for processing utilities and general helper functions

// using an arrow function here fails, as 'this' is not defined
String.prototype.capitalize = function () {
  /**
   * Capitalizes first letter of the string and returns full string
   */
  return this.charAt(0).toUpperCase() + this.slice(1)
}

Array.prototype.diff = function (a) {
  return this.filter(i => a.indexOf(i) > 0)
}

Array.prototype.objectDiff = function (passedArray) {
  /**
   * Compares two arrays of objects and returns the objects that are present
   * in the class array that are not in the passed array
   * @param {array} passedArray - Array to be checked against
   */
  return this.filter(a => {
    let stop
    passedArray.forEach(item => {
      if (isEqual(a, item)) {
        stop = true
        return
      }
    })
    if (stop) return false
    return true
  })
}

// super admin account list
export const adminAccountList = [61, 89, 90, 104, 105]

export function generateRandomString(length, numOnly) {
  const allCapsAlpha = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  const allLowerAlpha = [...'abcdefghijklmnopqrstuvwxyz']
  const allNumbers = [...'0123456789']

  let base = [...allNumbers]
  if (!numOnly) {
    base = [...base, ...allCapsAlpha, ...allLowerAlpha]
  }
  return [...Array(length)]
    .map(i => base[Math.random() * base.length || 0])
    .join('')
}

export function generateUUID() {
  return uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  // return generateRandomString(8)+'-'+generateRandomString(4)+'-'+generateRandomString(4)+'-'+generateRandomString(4)+'-'+generateRandomString(12);
}

export function verifyResult(resultArray) {
  const verify = resultArray

  if (Array.isArray(verify)) {
    if (verify.length >= 2) {
      if (verify[0]) {
        return true
      }
      return false
    }
  } else if (typeof verify === 'object') {
    if ('success' in verify) {
      return verify.success
    }
  }
  return false
}

/**
 * A utility function to parse tag objects from database to library, or vice versa
 * @param {Array} tagArray - Array of tag objects
 * @param {('toDB'|'toLib')} direction - "toDB" or "toLib"
 */
export const processTagArray = (tagArray, direction) => {
  let res
  if (tagArray === null) return []
  if (!Array.isArray(tagArray))
    throw new Error(
      'toSlug function requires an array for the tagArray parameter'
    )

  const allowedDirs = ['toDB', 'toLib']
  if (!allowedDirs.includes(direction))
    throw new Error(
      'Direction parameter of processTagObject function must be either "toDB" or "toLib"'
    )

  if (direction === 'toDB') {
    const parsedArray = tagArray.map(tagObject => {
      const { id, text } = tagObject
      const slug = id.toLowerCase()
      return {
        slug,
        value: text,
      }
    })
    res = parsedArray
  }
  if (direction === 'toLib') {
    const parsedArray = tagArray.map(tagObject => {
      const { value } = tagObject
      const id = value
      const text = value
      return { id, text }
    })
    res = parsedArray
  }

  return res
}

export function resultMessage(resultArray) {
  const verify = resultArray
  if (Array.isArray(verify)) {
    if (verify.length >= 2) {
      return verify[1]
    }
  } else if (typeof verify === 'object') {
    if ('message' in verify) {
      return verify.message
    }
  }
  return null
}

export function resultReturn(resultArray) {
  const verify = resultArray
  if (Array.isArray(verify)) {
    if (verify.length >= 3) {
      return verify[2]
    }
  } else if (typeof verify === 'object') {
    if ('data' in verify) {
      return verify.data
    }
  }
  return null
}

export function showMessage(title = '', msg = '', type = 'success') {
  let partCount = 0
  if (title !== '') partCount += 1
  if (msg !== '') partCount += 1

  if (partCount === 2) {
    // eslint-disable-next-line
    alert(`${title}\n${msg}`)
  } else if (partCount == 1) {
    if (title !== '') alert(title)
    if (msg !== '') alert(msg)
  }
}

export function printJS(o) {
  let str = ''

  for (const p in o) {
    if (typeof o[p] == 'string') {
      str += `${p}: "${o[p]}"; \n`
    } else {
      str += `${p}: { \n${printJS(o[p])}}`
    }
  }

  return str
}

export function objectKeyValCheck(val, object, key) {
  const matches = object.filter(i => {
    if (!(key in i)) return false

    return i[key] == val
  })
  return matches.length === 0
}

export function objectKeyVal(val, object, key) {
  const matches = object.filter(
    i => {
      if (!(key in i)) return false

      return i[key] == val
    }
    // console.log(i[key],val,i[key] == val)
  )

  if (matches.length === 1) {
    return matches[0]
  }
  return matches
}

export function addVal(array, key, val) {
  if (Array.isArray(array)) {
    if (!array.includes(key)) {
      return [...array, key]
    }
    return array
  }
  if (typeof array === 'object') {
    if (!(key in array)) {
      array[key] = val
      return array
    }
    return array
  }
  return null
}

export function unVal(array, key, objectKey) {
  if (Array.isArray(array)) {
    if (array.includes(key)) {
      return array.filter(function (item) {
        return item !== key
      })
    } else {
      return array.filter(function (item) {
        if (typeof item === 'object' && !Array.isArray(item)) {
          if (!(objectKey in item)) {
            return false
          } else {
            return item[objectKey] !== key
          }
        } else return item !== key
      })
    }
    return array
  }
  if (typeof array === 'object') {
    if (key in array) {
      delete array[key]
      return array
    }
    return array
  }
  return null
}

export function toggleVal(array, key, val) {
  if (Array.isArray(array)) {
    if (!array.includes(key)) {
      return [...array, key]
    }
    return array.filter(function (item) {
      return item !== key
    })
  }
  if (typeof array === 'object') {
    if (!(key in array)) {
      array[key] = val
      return array
    }
    delete array[key]
    return array
  }
  return null
}

export function getImage(UUID, defaultImage) {
  if (defaultImage == null) defaultImage = 'default.png'

  const imageUrl =
    'https://my-asset-map-data.s3.amazonaws.com/public/client_data/static/images/'

  if (UUID == '' || UUID == null) return imageUrl + defaultImage
  return imageUrl + UUID
}

export function getImageAsStyle(UUID, defaultImage, options) {
  const img = getImage(UUID, defaultImage)

  const size = typeof options.size !== 'undefined' ? options.size : '32px'

  const imgStyle = {
    backgroundImage: `url('${img}')`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'default',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  if (size !== false) {
    imgStyle.height = size
    imgStyle.width = size
  }

  return imgStyle
}

export function buildImageStack(imgArray, options) {
  if (!Array.isArray(imgArray)) imgArray = [imgArray]
  if (typeof options !== 'object') options = {}

  const all = typeof options.all !== 'undefined' ? options.all : true
  const imgStackClass =
    typeof options.imgStackClass !== 'undefined'
      ? options.imgStackClass
      : 'imageStack'
  const imgStackItemClass =
    typeof options.imgStackItemClass !== 'undefined'
      ? options.imgStackItemClass
      : 'imageStackItem'
  const profileImgClass =
    typeof options.profileImgClass !== 'undefined'
      ? options.profileImgClass
      : 'projectEmployeePic'

  const returnTxt = []
  const itemList = []
  let curItem = 0
  let curColumn = 0

  // var stackOptions = ['default' => 'user'];
  // if (size !== false) stackOptions['width'] = size;
  // if (size !== false) stackOptions['height'] = size;

  imgArray.forEach(function (item) {
    curItem += 1
    curColumn += 1

    if (all || curItem <= 5) {
      if (typeof item === 'object' && typeof item.profileImg !== 'undefined') {
        // eslint-disable-next-line fp/no-mutating-methods
        returnTxt.push({
          className: [imgStackItemClass, `imageStackItem_${curItem}`].join(' '),
          style: {
            gridColumn: `${(curColumn += 1)} / span 3`,
            gridRow: 1,
            zIndex: curItem,
          },
          id: item.id,
          name: item.displayName,
          imgStyle: getImageAsStyle(item.profileImg, 'user.png', options),
        })

        // eslint-disable-next-line fp/no-mutating-methods
        itemList.push(item.displayName)
      }
    }
  })

  if (!all && imgArray.length > 5) {
    // eslint-disable-next-line fp/no-mutating-methods
    returnTxt.push({
      className: [imgStackItemClass, 'imageStackItem_showMore'].join(' '),
      style: { gridColumn: '6 / span 3', gridRow: 1, zIndex: 6 },
      imgContents: `+${(imgArray.length - 5).toString()}`,
    })
  }

  const tooltip = ''
  // if (count(itemList) > 0) tooltip = appendTooltip(implode(', ',itemList).suffix);

  // {/*...appendTooltip(item.firstName)*/}
  // {/*...appendImgBG(getImage(item.profileImg))*/}
  return (
    <div className={imgStackClass}>
      {returnTxt.map(rtrn => (
        <div
          className={rtrn.className}
          style={rtrn.style}
          data-entryid={rtrn.id}
          data-entryname={rtrn.name}
        >
          <div className={profileImgClass} style={rtrn.imgStyle}>
            {rtrn.imgContents != null && rtrn.imgContents}
          </div>
        </div>
      ))}
    </div>
  )
}

export function getRole(role, userRole) {
  if (typeof role === 'undefined') role = userRole
  if (role === 'owner') return 'Owner'
  if (role === 'viewer') return 'Viewer'
  if (role === 'editor') return 'Editor'
  if (role === 'full-user') return 'Full User'
  if (role === 'no-access') return 'No Access'
  return ''
}

/**
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @example arrayOfObjects.sort(utils.objectSort("key"))
 * @param {String} property Key of the object to sort.
 */
export function objectSort(property) {
  var sortOrder = 1

  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }

  return function (a, b) {
    if (!b[property] && !a[property]) return 0
    if (b[property] && !a[property]) return -1
    if (!b[property] && a[property]) return 1

    if (typeof a[property] !== 'string') a[property] = a[property].toString()
    if (typeof b[property] !== 'string') b[property] = b[property].toString()

    if (sortOrder == -1) {
      return b[property].localeCompare(a[property])
    } else {
      return a[property].localeCompare(b[property])
    }
  }
}

export const sortByOrder = array => {
  const clone = cloneDeep(array)
  clone.sort((a, b) => (a.order > b.order ? 1 : -1))
  return clone
}

/**
 * A utility function to search an array for given values
 *
 * @param {Array} array Array to search
 * @param {string} key key within array to search through
 * @param {string} searchValue value to search for
 * @param {boolean} [deepsearch] search recursively
 * @returns {Object}
 * ```js
 * {
 *   items: [...] // array of searched items
 *   error: true || false
 *   message: '...'
 * }
 * ```
 */
export const searchSort = (array, key, searchValue, deepsearch = false) => {
  const returnObj = {
    error: false,
  }
  if (!Array.isArray(array) || typeof searchValue !== 'string')
    returnObj.error = true

  if (Object.keys(array[0]).indexOf(key) === -1) {
    returnObj.error = true
    returnObj.message = `There is no key "${key}" in specified array`
  }

  searchValue = searchValue.split('')
  searchValue = searchValue.map(val => val.toLowerCase())
  searchValue = searchValue.join('')

  const data = array.filter(item => {
    if (deepsearch) {
      if (typeof item[key] !== 'object') {
        returnObj.error = true
        returnObj.message = 'Can not deepsearch as search key is not an object'
      }

      Object.values(item[key]).forEach(k => {
        let check = k.split('')
        check = check.map(v => v.toLowerCase)
        check = check.join('')
        if (check.includes(searchValue)) return true
      })
    }
    if (item[key]) {
      let check = item[key].split('')
      check = check.map(v => v.toLowerCase())
      check = check.join('')
      if (check.includes(searchValue)) return true
    }
    return null
  })

  if (returnObj.error) return returnObj
  returnObj.items = data
  return returnObj
}

export const capitalizeFirstLetter = words => {
  if (typeof words === 'string' || Array.isArray(words)) {
    let r

    if (Array.isArray(words)) {
      r = words.map(word => {
        word = word.charAt(0).toUpperCase() + word.slice(1)
      })
    } else {
      r = words.charAt(0).toUpperCase() + words.slice(1)
    }

    return r
  }

  return console.error(
    'Words passed must be either a string or an array of strings'
  )
}

export function deepCopy(array) {
  let copy = JSON.parse(JSON.stringify(array))
  return copy
}

export const parseActiveFilters = configObject => {
  if (!configObject || typeof configObject !== 'object') return undefined

  const aFilters = []
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, val] of Object.entries(configObject)) {
    if (key !== 'paginate') {
      if (key === 'filter') {
        // eslint-disable-next-line no-restricted-syntax
        for (const [k, v] of Object.entries(val)) {
          if (Array.isArray(v)) {
            v.forEach(obj => aFilters.push(obj.dropdownValue))
          } else if (v !== '') aFilters.push(v)
        }
      } else if (val !== '' && val !== null) {
        aFilters.push(val)
      }
    }
  }
  console.log('RETURNING ACTIVE FILTERS :>> ', aFilters)
  return aFilters
}

export const stringToArray = stringData => {
  const buf = new ArrayBuffer(stringData.length)
  const view = new Uint8Array(buf)

  for (let i = 0; i !== stringData.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    view[i] = stringData.charCodeAt(i) & 0xff
  }
  return buf
}

export const save = (fileName, data, type, isBinary) => {
  if (isBinary) {
    const bytes = new Array(data.length)
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      bytes[i] = data.charCodeAt(i)
    }
    data = new Uint8Array(bytes)
  }

  const blob = new Blob([stringToArray(atob([data]))], { type })
  const objectURL = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = objectURL
  anchor.download = fileName
  anchor.click()

  URL.revokeObjectURL(objectURL)
}

export function getTodayDateInSpecificFormat() {
  const todayDate = new Date()

  let month = (todayDate.getMonth() + 1).toString()
  let day = todayDate.getUTCDate().toString()
  // -7 so it matches MST
  const hour = (todayDate.getUTCHours() - 7).toString() + '00'
  let minute = todayDate.getUTCMinutes().toString()
  let second = todayDate.getUTCSeconds().toString().split(':')[0]
  const year = todayDate.getUTCFullYear().toString()

  if (month.length < 2) month = 0 + month
  if (day.length < 2) day = 0 + day
  if (minute.length < 2) minute = 0 + minute
  if (second.length < 2) second = 0 + second

  const finalDateFormat = year + month + day + '_' + hour + minute + second

  return finalDateFormat
}
