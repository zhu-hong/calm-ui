import { createContext, ReactNode, useContext, useMemo } from 'react'

type Palette = {
  primary: string;
  danger: string;
  success: string;
  warning: string;
  default: string;
}

type ContextType = {
  palette?: Partial<Palette>
}

export const createTheme = (theme?: ContextType) => {
  return useMemo(() => {
    return {
      palette: {
        primary: theme?.palette?.primary ?? '#058373',
        danger: theme?.palette?.danger ?? '#F54A45',
        success: theme?.palette?.success ?? '#00D078',
        warning: theme?.palette?.warning ?? '#FF9900',
        default: theme?.palette?.default ?? '#000C25',
      },
    }
  }, [theme])
}

const ThemeContext = createContext<ReturnType<typeof createTheme>|null>(null)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if(context === null) return createTheme()

  return context
}

export const ThemeProvider = ({ children, value }: { children: ReactNode; value: ContextType }) => {
  const context = createTheme(value)

  return <ThemeContext value={context}>
    {children}
  </ThemeContext>
}
