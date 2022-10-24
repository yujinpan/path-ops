export function resolveWithAlias(
  path: string,
  aliasMap: Record<string, string>,
) {
  aliasMap = normalizeAliasMap(aliasMap);

  const key = Object.keys(aliasMap).find(
    (item) => path.startsWith(item + '/') || path === item,
  );
  if (key) {
    if (key === path) {
      return aliasMap[key];
    } else {
      return path.replace(key, aliasMap[key]).replace(/\/\//g, '/');
    }
  }
  return path;
}

export function resolveToAlias(path: string, aliasMap: Record<string, string>) {
  aliasMap = normalizeAliasMap(aliasMap);

  const key = Object.keys(aliasMap).find((item) =>
    path.startsWith(aliasMap[item]),
  );
  if (key) {
    return path.replace(aliasMap[key], key);
  }
  return path;
}

export function normalizeAliasMap(aliasMap: Record<string, string>) {
  const result: Record<string, string> = {};
  for (const key in aliasMap) {
    result[normalizePath(key)] = normalizePath(aliasMap[key]);
  }
  return result;
}

export function normalizePath(path: string) {
  return path.replace(/\/(\*.*|$)/, '');
}
