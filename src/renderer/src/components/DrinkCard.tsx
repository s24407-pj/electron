// components/DrinkCard.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardFooter, Button } from '@heroui/react' // Jeśli dostępne
// Jeśli nie, możesz użyć zwykłych <div> z Tailwind CSS

export interface Drink {
  id: number
  name: string
  description?: string
}

interface DrinkCardProps {
  drink: Drink
  onDispense: (pump: number, volume: number) => void
}

const DrinkCard: React.FC<DrinkCardProps> = ({ drink, onDispense }): JSX.Element => {
  const { t } = useTranslation()

  const handleDispenseClick = (): void => {
    onDispense(drink.id, 50)
  }

  return (
    <Card className="hover:scale-105 transform transition duration-300">
      <CardBody>
        <h3 className="text-2xl font-bold mb-2">{drink.name}</h3>
        <p className="mb-4">{drink.description}</p>
      </CardBody>
      <CardFooter>
        <Button onPress={handleDispenseClick} variant="bordered">
          {t('dashboard.dispense', 'Dispense')}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DrinkCard
