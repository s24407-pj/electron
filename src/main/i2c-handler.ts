import i2c from 'i2c-bus'
import { Buffer } from 'buffer'
import { createRequire } from 'module'
export const nodeRequire = createRequire(import.meta.url)

const MAX_PUMPS = 16 // Maksymalna liczba pomp

export default async function dispenseLiquid(tubeNumber: number, amount: number): Promise<void> {
  if (amount < 1 || amount > 100) {
    console.error('Błąd: Ilość musi być pomiędzy 1 a 100')
    return
  }
  if (tubeNumber < 1 || tubeNumber > MAX_PUMPS) {
    console.error('Błąd: Numer rurki musi być pomiędzy 1 a ' + MAX_PUMPS)
    return
  }

  const I2C_BUS = 1
  const TUBES_PER_ARDUINO = 4

  const arduinoAddress: number = Math.floor((tubeNumber - 1) / TUBES_PER_ARDUINO) + 1
  const portNumber: number = ((tubeNumber - 1) % TUBES_PER_ARDUINO) + 1
  const message = `P${portNumber}:${amount}`
  const buffer: Buffer = Buffer.from(message, 'utf-8')
  const i2cBus = i2c.openSync(I2C_BUS)

  try {
    i2cBus.i2cWriteSync(arduinoAddress, buffer.length, buffer)
    console.log(`Sent to Arduino number ${arduinoAddress} -> ${message}`)
  } catch (error) {
    console.error(`Error sending to ${arduinoAddress}:`, error)
  }

  i2cBus.closeSync()
}
