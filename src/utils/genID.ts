export default function genId() {
  return '_' + (Math.random() * new Date().getTime() * 10000).toString(36).substr(2,9)
}