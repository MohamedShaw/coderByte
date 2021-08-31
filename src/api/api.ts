import ky from 'ky'

export let api = ky.create({
  prefixUrl: 'https://resilient-summit-xda1oxg72oac.vapor-farm-b1.com/api/v2/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'App-Id': 1,
    lang: 'ar',
  },
})

export async function setApiToken(token: string) {
  api = api.extend({headers: {Authorization: `Bearer ${token}`}})
}

export async function clearApiToken() {
  api = api.extend({headers: {Authorization: undefined}})
}
