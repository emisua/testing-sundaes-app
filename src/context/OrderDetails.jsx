import { createContext, useContext, useState } from 'react'
import { pricePerItem } from '../constants'

const OrderDetails = createContext()

// Custom hook

export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails)

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from an OrderDetailsProvider'
    )
  }

  return contextValue
}

export const OrderDetailsProvider = ({ children }) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // example: {chocolate: 1, Vanilla: 2}
    toppings: {}, // example: {"Gummi Bears" : 1}
  })
  const updateItemCount = (itemName, newItemCount, optionType) => {
    // Make a copy of existing state
    const newOptionCounts = { ...optionCounts }

    // Update the copy with the new info
    newOptionCounts[optionType][itemName] = newItemCount

    // Set new state
    setOptionCounts(newOptionCounts)
  }
  const resetOrder = () => {
    setOptionCounts({
      scoops: {}, // example: {chocolate: 1, Vanilla: 2}
      toppings: {}, // example: {"Gummi Bears" : 1}})
    })
  }

  // Utility function to calculate totals from optionCounts state value
  const calculateTotal = (optionType) => {
    // Get an array of counts for the option type (for example, [1,2])
    const countsArray = Object.values(optionCounts[optionType])

    // Total the values in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0)

    // Multiply the total number of items by the price for this item type
    const total = totalCount * pricePerItem[optionType]
    return total
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  }

  return (
    <OrderDetails.Provider
      value={{ optionCounts, updateItemCount, resetOrder, totals }}
    >
      {children}
    </OrderDetails.Provider>
  )
}
