import { createSlice } from "@reduxjs/toolkit"


export enum ToastifyTypesEnum {
    WARNING = 'warning',
    SUCCES = 'succes',
    ERROR = 'error',
}


interface IToastiData {
    id: number;
    data: string
    type: ToastifyTypesEnum
}


interface IErrorInit {
    data: IToastiData[],
}


const initialState: IErrorInit = {
    data: [],
}

const ErrorSlice = createSlice({
    name: 'toastify',
    initialState,
    reducers: {
        setToastiState: (state, { payload }) => {
            let myToasti = [...payload.map((item: IToastiData) => ({ ...item, id: +new Date() + Math.random() }))]
            let newData = [...myToasti, ...state.data,]
            state.data = newData
        },
        removeToastiState: (state, { payload }) => {
            let newData = state.data.filter(item => item.id != payload.data)
            state.data = newData
        }
    },

}
)

export default ErrorSlice.reducer

export const {
    setToastiState,
    removeToastiState
} = ErrorSlice.actions