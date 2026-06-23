/** Simple JSON serializer with error handling */
export function serialize<T>(data: T): string {
  try {
    return JSON.stringify(data);
  } catch (e) {
    console.error('Serialization error', e);
    return '';
  }
}

export function deserialize<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    console.error('Deserialization error', e);
    return null;
  }
}
