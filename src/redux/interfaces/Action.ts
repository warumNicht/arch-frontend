import { User } from "./ArchitectureAppStore";

interface ActionType{
    type: string
}

export default interface Action extends ActionType{
    payload?: any
}

export interface SetUserAction extends ActionType{
    user: User | null
}

