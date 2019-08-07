// global.js
export function makeFullPartyName(key) {
  switch (key.toUpperCase()) {
    case 'D':
      return 'Democratic';
    case 'R':
      return 'Republican';
    case 'ID':
      return 'Independent';
    case 'I':
      return 'Independent Democrat'
    default:
      return key;
  }
}