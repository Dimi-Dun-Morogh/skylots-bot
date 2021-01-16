import { getAucTasksFor24Hours } from '../../db/auc-crud';
import { ITasks } from '../../interfaces/taskScheduler';

export default {
  tasks: {} as ITasks,
  async setTasks() : Promise<void> {
    const fetchedTasks = await getAucTasksFor24Hours();
    this.tasks = fetchedTasks.reduce((acc, item) => {
      acc[item._id] = item;
      return acc;
    }, {});
  },
  removeTask(id: string) {
    delete this.tasks[id];
  },
};
