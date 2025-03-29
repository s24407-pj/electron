// components/LanguageSelector.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectItem, Avatar } from '@heroui/react'

interface Language {
  code: string
  label: string
  flagUrl: string
}

const languages: Language[] = [
  { code: 'en', label: 'English', flagUrl: 'https://flagcdn.com/us.svg' },
  { code: 'pl', label: 'Polski', flagUrl: 'https://flagcdn.com/pl.svg' }
]

const LanguageSelector: React.FC = (): JSX.Element => {
  const { i18n } = useTranslation()

  // Zmieniamy język na podstawie wybranej opcji
  const handleChange = (value: string): void => {
    i18n.changeLanguage(value)
  }

  return (
    <Select className="max-w-xs" label="Select country" value={i18n.language}>
      {languages.map((lang) => (
        <SelectItem
          key={lang.code}
          startContent={<Avatar alt={lang.label} className="w-6 h-6" src={lang.flagUrl} />}
        >
          {lang.label}
        </SelectItem>
      ))}
    </Select>
  )
}

export default LanguageSelector
