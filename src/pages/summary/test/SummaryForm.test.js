import { render, screen } from '@testing-library/react'
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

describe('Comportamiento del boton con el checkbox', () => {
  test('Checkbox unchecked by default', () => {
    render(<SummaryForm />)
    const button = screen.getByRole('button', { name: /comprar/i })
    const checkbox = screen.getByRole('checkbox', {
      label: /Accept terms and conditions/i,
    })
    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
  })
  test('Checking checkbox enables button', async () => {
    render(<SummaryForm />)
    const button = screen.getByRole('button', { name: /comprar/i })
    const checkbox = screen.getByRole('checkbox', {
      name: /Accept terms and conditions/i,
    })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(button).toBeEnabled()

    // Segundo click
    await user.click(checkbox)
    expect(button).toBeDisabled()
    expect(checkbox).not.toBeChecked()
  })
})

describe('pophover testing', () => {
  test('Pophover responds to hover', async () => {
    render(<SummaryForm />)
    const nullPophover = screen.queryByText(
      /No ice cream will actually be delivered/i
    )
    const termsAndConditions = screen.getByText(/terms and conditions/i)

    // pophover starts out hidden
    expect(nullPophover).not.toBeInTheDocument()

    // pophover appears on mousehover of checkbox label
    await user.hover(termsAndConditions)
    const pophover = screen.getByText(
      /No ice cream will actually be delivered/i
    )
    expect(pophover).toBeInTheDocument()

    // pophover dissapear when mouse out
    await user.unhover(termsAndConditions)
    expect(pophover).not.toBeInTheDocument()
  })
})
