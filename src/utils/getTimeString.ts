export function getTimeString(value: number | string | Date) {

  const now = new Date().getTime();
  const time = new Date(value).getTime();


  const seconds = Math.floor(Math.abs(now - time) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  const secondsString = `${seconds > 60 ? seconds % 60 : seconds}s`
  const minutesString = `${minutes > 60 ? minutes % 60 : minutes}min`
  const hoursString = hours < 1 ? '' : `${hours % 24}h`

  return hours > 0 ? `${hoursString} ${minutesString}` 
  : minutes > 0 ? `${minutesString} ${secondsString}` : secondsString
  
}