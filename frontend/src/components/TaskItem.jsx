function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
        aria-label="완료 상태"
      />
      <div className="task-body">
        <p>{task.title}</p>
      </div>
      <button className="task-delete" onClick={() => onDelete(task.id)} aria-label="할 일 삭제">
        ✕
      </button>
    </article>
  );
}

export default TaskItem;
