// App.tsx
import React from 'react'
import Dashboard from './components/Dashboard'
import { HeroUIProvider } from '@heroui/react'

const App: React.FC = (): JSX.Element => {
  return (
    <HeroUIProvider>
      <div className="min-h-screen p-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <Dashboard />
      </div>
    </HeroUIProvider>
  )
}

export default App
