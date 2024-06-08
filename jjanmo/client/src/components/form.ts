import { v4 as uuidv4 } from 'uuid'
import { state, dispatch } from '@/store'
import { Todo } from '@/types'
import { renderList } from '@/components/list'
import { renderClearCompletedBtn, renderControlContainer } from './control'

const $todoForm = document.querySelector('.todo-form') as HTMLFormElement
const $todoInput = document.querySelector('.todo-input') as HTMLInputElement
const $allToggleBtn = document.querySelector('.all-toggle-btn') as HTMLButtonElement

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const text = $todoInput.value
  if (!text) return

  const todo: Todo = {
    id: uuidv4(),
    text,
    status: 'active',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  dispatch({ type: 'ADD_TODO', payload: todo })

  renderToggleAllBtn()
  renderList()
  renderControlContainer()

  $todoInput.value = ''
}

export const renderToggleAllBtn = () => {
  const { todos } = state

  const todoCount = todos.length
  if (todoCount === 0) $allToggleBtn.classList.add('hidden')
  else $allToggleBtn.classList.remove('hidden')
}

const changeToggleBtnStyle = () => {
  const { isAllCompleted } = state
  if (isAllCompleted) $allToggleBtn.classList.add('all-completed')
  else $allToggleBtn.classList.remove('all-completed')
}

const handleToggleAllBtbClick = () => {
  dispatch({ type: 'CHANGE_TOGGLE_ALL_BTN_VISIBILITY' })
  changeToggleBtnStyle()

  dispatch({ type: 'TOGGLE_ALL_TODO_ITEMS' })
  renderList()
  renderClearCompletedBtn()
}

const init = () => {
  $todoForm.addEventListener('submit', handleSubmit)
  $allToggleBtn.addEventListener('click', handleToggleAllBtbClick)
}

init()
