import Options from './Options'
import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'
import { Button } from 'react-bootstrap'

const OrderEntry = () => {
  const { totals } = useOrderDetails()
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button>Order Sundae!</Button>
    </div>
  )
}
export default OrderEntry
