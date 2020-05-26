export interface User{
    username: string,
    roles: string[]
}

export default interface ArchitectureAppStore {
    token: string,
    user: User
}