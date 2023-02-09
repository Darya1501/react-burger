import React, { FC, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useDispatch } from '../../hooks/store-hooks'; 

import { MOVE_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT } from '../../services/constants/constructor';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

import { DECREMENT_IGREDIENT_COUNT } from '../../services/constants/ingredients';
import { TIngredient } from '../../utils/types';

type TConstructorIngredientProps = {
  ingredient: TIngredient,
  index: number
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const ConstructorIngredient: FC<TConstructorIngredientProps>= ({ ingredient, index }) => {
  const dragID = ingredient.constructorID;
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
    accept: 'constructor-ingredients',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch({
        type: MOVE_CONSTRUCTOR_INGREDIENT,
        dragIndex, 
        hoverIndex
      })
      item.index = hoverIndex
    },
  })


  const [{ opacity }, drag] = useDrag({
    type: 'constructor-ingredients',
    item: () => {
      return { dragID, index }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
  })

  drag(drop(ref))

  const onDelete = (id: string, constructorID: number): void => {
    dispatch({ type: REMOVE_CONSTRUCTOR_INGREDIENT, constructorID })
    dispatch({ type: DECREMENT_IGREDIENT_COUNT, id })
  }

  return (
    <div className={styles.choice} ref={ref} style={{ opacity }} data-handler-id={handlerId}> 
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass='ml-2'
        handleClose={() => onDelete(ingredient._id, ingredient.constructorID)}
      />
    </div>
  )
}
