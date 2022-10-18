export function getTimeString(value: number | string | Date, reference?: Date) {
  reference = (reference || new Date());
  // reference.setHours(reference.getHours() - reference.getTimezoneOffset())
  const now = reference.getTime();
  const time = new Date(value).getTime();
  const dif = Math.abs(now - time)

  if (dif < 60000) {
    return "agora pouco"
  }

  const seconds = Math.floor(dif / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const secondsString = `${seconds > 60 ? seconds % 60 : seconds}s`
  const minutesString = `${minutes > 60 ? minutes % 60 : minutes}min`
  const hoursString = hours < 1 ? '' : `${hours % 24}h`
  const daysString = days <= 1 ? '+1 dia' : `+${days} dias`
  console.log("diferença", days, '-', hours, '-', minutes, '-', seconds)

  return hours > 0 ? days > 0 ? daysString : `${hoursString} ${minutesString}`
    : minutes > 0 ? `${minutesString} ${secondsString}` : secondsString

}