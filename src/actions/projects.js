export function add(payload = {}) {
  return {
    type: 'ADD',
    payload: payload
  };
}
