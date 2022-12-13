import { Col, Form, Row } from 'react-bootstrap'
import { useOrderDetails } from '../../context/OrderDetails'

const ToppingOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails()
  const handleChange = (e) => {
    return updateItemCount(name, e.target.checked ? 1 : 0, 'toppings')
  }
  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      style={{ textAlign: 'center' }}
    >
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: '75%' }}
      />

      <Form.Group
        controlId={`${name}-topping-checkbox`}
        style={{
          marginTop: '10px',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Form.Check
          type='checkbox'
          onChange={handleChange}
          label={name}
          style={{ float: 'none' }}
          name={name}
        />
      </Form.Group>
    </Col>
  )
}
export default ToppingOption
