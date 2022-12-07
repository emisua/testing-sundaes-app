import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(false)
  const inputLabel = <span>Accept terms and conditions</span>
  return (
    <Form>
      <Form.Group controllId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          id='comprar'
          label={inputLabel}
          onChange={(e) => {
            setDisabled(e.target.checked)
          }}
        />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        disabled={!disabled}
      >
        Comprar
      </Button>
    </Form>
  )
}
export default SummaryForm
