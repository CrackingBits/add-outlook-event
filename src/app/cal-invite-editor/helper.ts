export default class Helper {
  static convertToLocalIso(dateToConvert: Date): string {

    // check, if this is valid Date object
    if (!dateToConvert || (typeof dateToConvert.getMonth !== 'function')) {
      return undefined;
    }

    // create time in fake UTC to be able to use toISOString method
    const fakeUTC = new Date(Date.UTC(dateToConvert.getFullYear(), dateToConvert.getMonth(), dateToConvert.getDate(),
      dateToConvert.getHours(), dateToConvert.getMinutes(), dateToConvert.getSeconds()));

    return fakeUTC.toISOString().substring(0, 16);
  }
}
