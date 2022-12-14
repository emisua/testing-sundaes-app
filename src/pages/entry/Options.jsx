import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import { Row } from 'react-bootstrap'
import AlertBanner from '../common/AlertBanner'
import { pricePerItem } from '../../constants'
import { formatCurrency } from '../../utilities'
import { useOrderDetails } from '../../context/OrderDetails'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const { totals } = useOrderDetails()
  // optiontype es 'scoops' o 'toppings'
  useEffect(() => {
    axios(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true)
      })
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  // TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}
export default Options
