// export function serialize(data) {
//   return JSON.parse(
//     JSON.stringify(data, (_, value) =>
//       typeof value === 'bigint' ? value.toString() : value
//     )
//   );
// }

export function serialize(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'bigint') {
    return obj.toString();
  }
  
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(serialize);
  }
  
  if (typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = serialize(value);
    }
    return result;
  }
  
  return obj;
}