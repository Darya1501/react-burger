import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { MOVE_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT } from '../../services/actions';
import styles from './burger-constructor.module.css'

export const ConstructorIngredient = ({ ingredient, index }) => {
  const dragID = ingredient.constructorID;
  const dispatch = useDispatch();

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
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

  const onDelete = (_id, constructorID) => {
    dispatch({
      type: REMOVE_CONSTRUCTOR_INGREDIENT,
      _id, constructorID
    })
  }

  return (
    <div className={styles.choice} ref={ref} style={{ opacity }} data-handler-id={handlerId}> 
      <DragIcon className='mr-2' />
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
