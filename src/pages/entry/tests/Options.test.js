import { render, screen } from '@testing-library/react'
import Options from '../Options'

test('display image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />)

  // Find images
  // Esta llamada es asíncrona porque las imágenes vienen del servidor y por lo tanto hay que usar async await
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  // /scoop$/ significa que la última palabra sea scoop
  expect(scoopImages).toHaveLength(2)

  // Confirm alt text of images
  const altText = scoopImages.map((scoop) => scoop.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('display image for each topping option from the server', async () => {
  render(<Options optionType='toppings' />)

  // Find images
  // Esta llamada es asíncrona porque las imágenes vienen del servidor y por lo tanto hay que usar async await
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  // /topping$/ significa que la última palabra sea topping
  expect(toppingImages).toHaveLength(3)

  // Confirm alt text of images
  const altText = toppingImages.map((topping) => topping.alt)
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ])
})
