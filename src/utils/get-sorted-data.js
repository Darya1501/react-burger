import { data } from "./data"

export const getSortedData = (array = data) => {
  const menu = {
    buns: [],
    sauces: [],
    mains: []
  }

  array.forEach(item => {
    if (item.type === "bun") {
      menu.buns.push(item)
    } else if (item.type === "sauce") {
      menu.sauces.push(item)
    } else {
      menu.mains.push(item)
    }
  })

  return menu
}