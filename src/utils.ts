import axios from 'axios';

export class Utils {

  constructor() {

  }
  isNumber(value: any): boolean {
    return !isNaN(value) && Math.floor(value) === value;
  }
  ReloadPage() {
    window.location.reload();
  }
  filterField(e: any) {
    let t = e.target;
    let badValues = /[.+-]/;
    t.value = t.value.replace(badValues, '');
  }
  clearField(e: any) {
    let t = e.target;
    let badValues = /[.+-a-zA-z]/;
    t.value = t.value.replace(badValues, '');
  }
}


export function doRequest(requestBody: any) {
  try {
    const promise = axios.post(requestBody.url, requestBody.body, { headers: requestBody.headers });
    const datapromise = promise.then((response) => response.data)
    return datapromise;
  } catch (errors) {
    console.error(errors);
    return undefined; // Return undefined in case of an error
  }
}


