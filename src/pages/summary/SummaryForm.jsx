import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(false)
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  )
  const inputLabel = (
    <span>
      Accept{' '}
      <OverlayTrigger
        placement='right'
        overlay={popover}
      >
        <span className='text-danger'>terms and conditions</span>
      </OverlayTrigger>
    </span>
  )

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
