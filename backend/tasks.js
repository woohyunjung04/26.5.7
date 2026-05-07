// 메모리 기반 작업 저장소
const tasks = [];
let nextId = 1;

/**
 * 새 작업을 생성합니다.
 * @param {string} title 작업 제목
 * @returns {object} 생성된 작업 객체
 */
export function createTask(title) {
  const task = {
    id: String(nextId++),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.unshift(task);
  return task;
}

/**
 * 모든 작업을 반환합니다.
 * @returns {Array<object>} 작업 목록
 */
export function getAllTasks() {
  return tasks;
}

/**
 * 작업 완료 상태를 토글합니다.
 * @param {string} taskId 작업 ID
 * @returns {object|null} 변경된 작업 또는 null
 */
export function toggleTaskStatus(taskId) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return null;
  task.completed = !task.completed;
  return task;
}

/**
 * ID로 작업을 삭제합니다.
 * @param {string} taskId 작업 ID
 * @returns {boolean} 삭제 성공 여부
 */
export function deleteTask(taskId) {
  const index = tasks.findIndex((item) => item.id === taskId);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
