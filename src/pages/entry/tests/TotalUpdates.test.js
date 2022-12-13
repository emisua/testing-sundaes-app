import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup()
  render(<Options optionType='scoops' />)
  // Total tiene que empezar a 0
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // Update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // Update chocoloate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update toppings subtotal when topping change', async () => {
  const user = userEvent.setup()
  render(<Options optionType='toppings' />)
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent('0.00')
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  await user.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  })
  await user.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('3.00')
  await user.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
  await user.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('0.00')
})

describe('grand total', () => {
  test('Grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup()
    render(<OrderEntry />)

    // Grand total starts at 0
    const grandTotal = screen.getByText('Grand Total: $', { exact: false })
    expect(grandTotal).toHaveTextContent('0.00')

    // Cambiar cantidades
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    await user.clear(chocolateInput)
    await user.type(chocolateInput, '1')

    // Cambiar total
    expect(grandTotal).toHaveTextContent('2.00')

    // Add cherries and check grand total
    const cherriesCheck = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })
    await user.click(cherriesCheck)
    expect(grandTotal).toHaveTextContent('3.50')
  })
})

test('grand total updates properly if topping is added first', async () => {
  const user = userEvent.setup()
  render(<OrderEntry />)
  const grandTotal = screen.getByText('Grand Total: $', { exact: false })
  // Add Hot fudge
  const hotfudgeCheckbox = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  })
  await user.click(hotfudgeCheckbox)
  expect(grandTotal).toHaveTextContent('1.50')
  // Add Chocolate
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, '1')
  // Cambiar total
  expect(grandTotal).toHaveTextContent('3.50')
})
