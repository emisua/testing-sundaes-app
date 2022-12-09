import { render, screen } from '@testing-library/react'
import Options from '../Options'

test('display image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />)

  // find images
  // Esta llamada es asyncrona porque las imágenes vienen del servidor y por lo tanto hay que usar async await
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  // /scoop$1/ significa que la última palabra sea scoop
  expect(scoopImages).toHaveLength(2)

  // Confirm alt text of images
  const altText = scoopImages.map((scoop) => scoop.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})
