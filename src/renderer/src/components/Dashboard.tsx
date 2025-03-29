// components/Dashboard.tsx
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import DrinkCard, { Drink } from './DrinkCard'
import LanguageSelector from './LanguageSelector'
import AddDrinkModal from './AddDrinkModal'

const Dashboard: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const fetchDrinks = async (): Promise<void> => {
    try {
      const data = await window.electron.ipcRenderer.invoke('get-drinks')
      setDrinks(data)
    } catch (error) {
      console.error('Error fetching drinks:', error)
    }
  }

  useEffect(() => {
    fetchDrinks()
  }, [])

  const handleOpenModal = (): void => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
  }

  const handleModalSubmit = async (name: string, description: string): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('add-drink', { name, description })
      setIsModalOpen(false)
      fetchDrinks()
    } catch (error) {
      console.error('Error adding drink:', error)
    }
  }

  const handleDispense = (pump: number, volume: number): void => {
    window.electron.ipcRenderer.send('dispense-liquid', { pump, volume })
  }

  return (
    <div>
      {/* Nagłówek */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold tracking-wider drop-shadow-lg mb-4 sm:mb-0">
          {t('dashboard.title')}
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleOpenModal}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 text-lg"
          >
            {t('dashboard.addDrink', 'Add Drink')}
          </button>
          <LanguageSelector />
        </div>
      </div>

      {/* Lista drinków */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {drinks.map((drink: Drink) => (
          <div key={drink.id}>
            <DrinkCard drink={drink} onDispense={handleDispense} />
          </div>
        ))}
      </div>

      {isModalOpen && <AddDrinkModal onClose={handleCloseModal} onSubmit={handleModalSubmit} />}
    </div>
  )
}

export default Dashboard
