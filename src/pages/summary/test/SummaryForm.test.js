import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

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
  test('Checking checkbox enables button', () => {
    render(<SummaryForm />)
    const button = screen.getByRole('button', { name: /comprar/i })
    const checkbox = screen.getByRole('checkbox', {
      name: /Accept terms and conditions/i,
    })
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(button).toBeEnabled()

    // Segundo click

    fireEvent.click(checkbox)
    expect(button).toBeDisabled()
    expect(checkbox).not.toBeChecked()
  })
})
