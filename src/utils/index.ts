export function displayTime(val:string ) {
  const [hrs, min] = val.split(':');
  return `${parseInt(hrs) % 12}:${min} ${parseInt(hrs) > 12 ? 'PM' : 'AM'}`
}
