// components/AddDrinkModal.tsx
import React, { useState } from 'react'
import { Modal, Button, Input, Textarea } from '@heroui/react'

interface AddDrinkModalProps {
  onClose: () => void
  onSubmit: (name: string, description: string) => void
}

const AddDrinkModal: React.FC<AddDrinkModalProps> = ({ onClose, onSubmit }): JSX.Element => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Nazwa drinka jest wymagana!')
      return
    }
    onSubmit(name, description)
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dodaj Drinka</h2>
        <div className="mt-4">
          <Input
            label="Nazwa drinka"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Podaj nazwę drinka"
          />
        </div>
        <div className="mt-4">
          <Textarea
            label="Opis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Podaj opis drinka (opcjonalnie)"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" onPress={onClose} variant="bordered">
            Anuluj
          </Button>
          <Button type="submit" onPress={() => {}} variant="solid">
            Dodaj
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddDrinkModal
