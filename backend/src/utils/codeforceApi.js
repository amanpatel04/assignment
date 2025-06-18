import crypto from 'crypto'

const API_KEY = process.env.CODEFORCE_API_KEY
const API_SECRET = process.env.CODEFORCE_API_SECRET

const getUserInfo = async (handle) => {
  const time = Math.floor(Date.now() / 1000)

  const method = 'user.info'
  const params = {
    handles: handle,
    apiKey: API_KEY,
    time: time
  }

  const apiSig = generateApiSig(method, params, API_SECRET)

  const urlParams = new URLSearchParams(params)
  urlParams.append('apiSig', apiSig)

  const url = `https://codeforces.com/api/${method}?${urlParams.toString()}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    return null
  }
}

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

export default getUserInfo


