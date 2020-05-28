export interface User{
    username: string,
    roles: string[]
}

export interface Category{
    id: string,
    name: string
}

export default interface ArchitectureAppStore {
    token: string,
    user: User,
    categories: Category[]
}