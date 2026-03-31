// import 'react-native-reanimated'
import Router from '@router'

import { LayoutProvider } from './src/stores/LayoutContext'
import { ThemeProvider } from './src/stores/ThemeContext'
import { UserProvider } from './src/stores/UserContext'
export default function App() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <UserProvider>
          <Router />
        </UserProvider>
      </LayoutProvider>
    </ThemeProvider>
  )
}