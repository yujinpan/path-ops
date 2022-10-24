# Path OPS

Operators for node path.

## Alias

- `resolveWithAlias(path, aliasMap)`

Resolve alias paths to source paths.

```ts
import { resolveWithAlias } from "path-ops";

resolveWithAlias("@/page/index", { "@": "src" });
// => src/page/index

// types
declare function resolveWithAlias(
  path: string,
  aliasMap: Record<string, string>
): string;
```

- `resolveToAlias`

Resolve source paths to alias paths.

```ts
import { resolveToAlias } from "path-ops";

resolveToAlias("src/page/index", { "@": "src" });
// => @/page/index

// types
declare function resolveToAlias(
  path: string,
  aliasMap: Record<string, string>
): string;
```
