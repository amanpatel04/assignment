import crypto from 'crypto'
import { URLSearchParams } from 'url'

const API_KEY = process.env.CODEFORCE_API_KEY
const API_SECRET = process.env.CODEFORCE_API_SECRET
function generateApiSig(method, params, apiSecret) {
  const rand = Math.random().toString(36).substring(2, 8);
  const sortedParams = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const stringToHash = `${rand}/${method}?${sortedParams}#${apiSecret}`;
  const hash = crypto.createHash('sha512').update(stringToHash).digest('hex');

  return rand + hash;
}

const requestApi = (method, params) => {
  return new Promise((resolve, reject) => {
    
    const apiSig = generateApiSig(method, params, API_SECRET)
    const url = new URLSearchParams(params)
    url.append('apiSig', apiSig)
    let data = null
    fetch(`https://codeforces.com/api/${method}?${url.toString()}`)
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getUserInfo = async (handle) => {
  const time = Math.floor(Date.now() / 1000)

  const method = 'user.info'
  const params = {
    handles: handle,
    apiKey: API_KEY,
    time: time
  }
  return await requestApi(method, params)
}


export const getUserRating = async (handle) => {
  const time = Math.floor(Date.now() / 1000)

  const method = 'user.rating'
  const params = {
    handle: handle,
    apiKey: API_KEY,
    time: time
  }
  
  return await requestApi(method, params)
}

export const getSubmissionByHandle = async (handle) => {
  const time = Math.floor(Date.now() / 1000)

  const method = 'user.status'
  const params = {
    handle: handle,
    apiKey: API_KEY,
    time: time
  }
  
  return await requestApi(method, params)
}



