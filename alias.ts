import { resolve } from 'node:path'

export const alias: Record<string, string> = {
  "@calm-ui/button": resolve(__dirname, "./packages/button/src/index.tsx"),
  "@calm-ui/modal": resolve(__dirname, "./packages/modal/src/index.tsx"),
  "@calm-ui/ripple": resolve(__dirname, "./packages/ripple/src/index.jsx"),
  "@calm-ui/theme": resolve(__dirname, "./packages/theme/index.tsx"),
}
