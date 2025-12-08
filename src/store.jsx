import { createStore } from "redux";

const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const initialState = {
   task: [],
   isLoading: false,
}
const taskReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_TASK:
         return {
            ...state,   //making duplicate copy of the state
            task: [...state.task, action.payload],//making previous data and add another data
         };

      case DELETE_TASK:
         const updatedTask = state.task.filter((currTask, index) => {
            return index !== action.payload;

         });
         return {
            ...state,
            task: updatedTask,
         }


      default:
         state;
   }

};
//create the redux store
export const store = createStore(taskReducer);
console.log(store);

console.log("initial State:", store.getState());

//dispatch the acion


store.dispatch({ type: ADD_TASK, payload: "BY MANGO AGAIN" });

store.dispatch({ type: DELETE_TASK, payload: 1 });
console.log("deleted state:", store.getState());

//action creater is a FUNCTION TO CREATE AN OBJECT 
const addTask = (data) => {
   return {
      type: ADD_TASK, payload: data
   }
}
store.dispatch(addTask('hello i am raj'));
console.log("uploaded state:", store.getState());

const deleteTask = (id) => {
   return { type:DELETE_TASK, payload: id };
}
store.dispatch(deleteTask(1));
console.log("uploaded state:", store.getState()); 