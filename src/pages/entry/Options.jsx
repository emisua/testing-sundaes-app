import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOption from './ScoopOption'
import { Row } from 'react-bootstrap'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  // optiontype es 'scoops' o 'toppings'
  useEffect(() => {
    axios(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
      })
  }, [optionType])

  // TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return <Row>{optionItems}</Row>
}
export default Options
