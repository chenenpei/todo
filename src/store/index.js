import * as Vuex from "vuex";

export const TASK_STATUS = {
    COMPLETE: "COMPLETE",
    INCOMPLETE: "INCOMPLETE",
    ARCHIVE: "ARCHIVE",
}

const store = Vuex.createStore({
    state() {
        return {
            list: [],
            archiveList: []
        }
    },
    mutations: {
        addTask(state, task) {
            state.list.unshift(task)
        },
        updateTask(state, payload) {
            const { index, task } = payload
            state.list[index] = task;
        },
        updateTasks(state, tasks) {
            state.list = tasks
        },
        deleteTask(state, index) {
            state.list.splice(index, 1);
        },
        addToArchive(state, payload) {
            const { index, task } = payload;
            state.list.splice(index, 1);
            state.archiveList.unshift(task)
        }
    }
});

export default store;