// helper function to read JSON body from request
export const getRequestBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch (err) {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', err => reject(err))
  })
}

