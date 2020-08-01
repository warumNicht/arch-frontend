
export interface User{
    username: string,
    roles: string[]
}

export interface Category{
    id: string,
    name: string,
}

export interface SelectedCategories{
    loadedCategories: string[]
}

interface Image{
    // id: string,
    name?: string,
    url?: string
}

export interface LanguageContent {
    title: string,
    content?: string,
    mainImage?: Image
}

export interface LocalContent {
    [key: string]: LanguageContent
}

export interface Article{
    id: string,
    title: string,
    content?: string,
    categoryId: string,
    mainImage?: Image,
    images?: Image[],
    admin?:{
        localContent: LocalContent
    }
}

export interface ArticlesByCategories{
    selectedCategories: SelectedCategories,
    articles: Article[]
}

export default interface ArchitectureAppStore {
    token: string,
    user: User,
    categories: Category[],
    articlesByCategories: ArticlesByCategories
}