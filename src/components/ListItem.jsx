import { useContext, useState } from "react"
import { useSelector } from "react-redux"
import { TaskContext } from "../store/context"
import { delete_task, set_done } from "../store/taskReducer"
import EditForm from "./EditForm"

export default function ListItem({ task }) {
  const dispatch = useContext(TaskContext)[1]
  const [isDone, setDone] = useState(task.done)
  const [isEditingMode, setEditingMode] = useState(false)
  const listItem_bg_color = useSelector(
    (state) => state.theme.listItem_bg_color
  )

  const handleDelete = () => {
    dispatch(delete_task(task.id))
  }
  const toggleDone = () => {
    setDone(!isDone)
    dispatch(set_done(task.id))
  }
  const toggleEditingMode = () => {
    setEditingMode(!isEditingMode)
  }

  return (
    <li
      className="list-item-wrapper"
      style={{ backgroundColor: listItem_bg_color }}
    >
      {!isEditingMode ? (
        <>
          <div className="content-wrapper">
            <input
              type="checkbox"
              id={task.id}
              onChange={toggleDone}
              checked={isDone}
            />
            <label className={isDone ? "checked" : ""} htmlFor={task.id}>
              <span>{task.content}</span>
              <small>
                Last updated on: {new Date(task.id).toString().substring(0, 28)}
              </small>
            </label>
          </div>
          <div className="btn-group">
            <button className="edit-btn" onClick={toggleEditingMode}>
              <i className="bi bi-pencil"></i>
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </>
      ) : null}
      {isEditingMode ? (
        <EditForm task={task} toggleEditingMode={toggleEditingMode} />
      ) : null}
    </li>
  )
}
