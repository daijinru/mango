/** covert mango chars from console */
function dataCharsToObj(chars: string) {
  let matched = chars.match(/(?<=<mango>).*(?=<\/mango>)/ig);
  if (!matched) return '';
  const matchedSplited = matched[0].split(',');
  const result: Record<string, any> = {};
  matchedSplited.forEach((r: string) => {
      const r1: string[] = r.split('&&');
      if (r1 && r1.length > 0) {
        result[r1[0]] = r1[1];
      }
  })
  return result;
}

export type RequestOption = {
  method?: string
  baseUrl?: string
  body?: any
  url: string
}
const requestOptionDefaults: RequestOption = {
  method: 'get',
  baseUrl: process.env.NODE_ENV === 'development' ? '' : window.location.protocol + '//' + window.location.host,
  body: null,
  url: '',
}

function request(option: RequestOption): Promise<any> {
  option = Object.assign({}, requestOptionDefaults, option)
  return new Promise((resolve, reject) => {
      switch (option.method) {
          case 'get':
            window.fetch(option.baseUrl + option.url).then(res => {
                return res.json();
            }).then(res => {
                if (res.status !== 1000) return reject(res.message || res.status);
                resolve(res.data)
            }).catch(error => {
              console.error(error)
              reject(error)
            })
            break
          case 'post':
            window.fetch(option.baseUrl + option.url, {
              method: option.method,
              body: JSON.stringify(option.body),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => {
              return res.json()
            }).then(res => {
              if (res.status !== 1000) return reject(res.message || res.status);
              resolve(res.data)
            }).catch(error => {
              console.error(error)
              reject(error)
            })
            break
          default:
              return;

      }
  })
}

export default {
  utils: {
    dataCharsToObj
  },
  api: {
    request
  }
}