import { useState } from 'react';

function TaskInput({ onAdd }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('할 일을 입력해주세요.');
      return;
    }

    try {
      await onAdd(trimmed);
      setValue('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="새 할 일"
      />
      <button type="submit">추가</button>
      {error && <p className="input-error">{error}</p>}
    </form>
  );
}

export default TaskInput;
