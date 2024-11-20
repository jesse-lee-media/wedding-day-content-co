/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
function filterArray(target: any[], source: any[], key: string): any[] {
  return source.filter((s) => !target.find((t) => t?.[key] === s?.[key]));
}

function isObject(item: unknown): item is Record<string, unknown> {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<T = Record<string, unknown>>(
  target: Partial<T>,
  source: Partial<T>,
  arrayFilterBy: Record<string, string> = {},
  seen = new WeakMap<object, object>(),
): T {
  if (!isObject(target) && !isObject(source)) {
    return {} as T;
  }

  if (isObject(target) && !isObject(source)) {
    return target as T;
  }

  if (!isObject(target) && isObject(source)) {
    return source as T;
  }

  if (seen.has(source)) {
    return seen.get(source) as T;
  }

  const output = { ...target } as T extends object ? T : Record<string, unknown>;

  seen.set(source, output);

  Object.keys(source).forEach((k) => {
    const key = k as keyof Partial<T>;
    const keyInTarget = key in target;
    const sourceValue = source[key];
    const targetValue = target?.[key];

    if (isObject(sourceValue) && keyInTarget && isObject(targetValue)) {
      const value = deepMerge(targetValue, sourceValue, arrayFilterBy, seen);

      Object.assign(output, { [key]: value });
    } else if (Array.isArray(sourceValue) && keyInTarget && Array.isArray(targetValue)) {
      const filterBy = arrayFilterBy?.[key as keyof typeof arrayFilterBy];

      if (filterBy) {
        const filteredArray = filterArray(targetValue, sourceValue, filterBy);

        Object.assign(output, { [key]: [...targetValue, ...filteredArray] });
      } else {
        Object.assign(output, { [key]: Array.from(new Set([...targetValue, ...sourceValue])) });
      }
    } else {
      Object.assign(output, { [key]: sourceValue });
    }
  });

  return output as T;
}
