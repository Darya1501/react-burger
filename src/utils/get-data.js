import { data } from "./data"

export const getData = () => {
  const menu = {
    buns: [],
    sauces: [],
    mains: []
  }

  data.forEach(item => {
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