import { TIngredient } from "./types"

export const getSortedData = (array: Array<TIngredient>) => {
  const menu: {buns: Array<TIngredient>, sauces: Array<TIngredient>, mains: Array<TIngredient>} = {
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