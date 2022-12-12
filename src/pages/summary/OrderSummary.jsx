import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'

const OrderSummary = () => {
  const { totals, optionCounts } = useOrderDetails()
  const scoopArray = Object.entries(optionCounts.scoops) // [['Chocolate': 2 ], ['Vanilla': 1]]
  const scoopList = scoopArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    )
  })
  const toppingsArray = Object.keys(optionCounts.scoops) // ['M&Ms', 'Gummy Bears']
  const toopingsList = toppingsArray.map((key) => {
    return <li key={key}>{key}</li>
  })
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppigns)}</h2>
      <ul>{toopingsList}</ul>
      <SummaryForm />
    </div>
  )
}
export default OrderSummary
