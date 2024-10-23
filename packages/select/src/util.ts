export type Option = { name?: string; value: any; disabled?: boolean; children?: Option[] }

type OptionsExpand = Option & { level: number; canExpand: boolean; expand: boolean; show: boolean; }

const expandOption = (options: Option[], level = 0, unExpandKeys: string[], show = true): OptionsExpand[] => {
  return options.map((o) => {
    const expand = !unExpandKeys.includes(o.value)
    return {
      ...o,
      level,
      expand,
      children: (!!o.children && o.children.length > 0) ? expandOption(o.children, level + 1, unExpandKeys, expand && show) : [],
      canExpand: !!o.children && o.children.length > 0,
      show,
    }
  })
}

export const DFSOptions = (options: Option[], unExpandKeys: string[]): OptionsExpand[] => {
  const optionsWithLevel = expandOption(options, 0, unExpandKeys)

  const res: OptionsExpand[] = []

  const stack: OptionsExpand[] = []

  optionsWithLevel.forEach((o) => {
    stack.unshift(o)
  })

  while (stack.length !== 0) {
    const target = stack.pop()
    
    res.push({
      ...target!,
    })

    if(target?.children) {
      stack.push(...[...(target.children as OptionsExpand[])].reverse())
    }
  }

  return res
}