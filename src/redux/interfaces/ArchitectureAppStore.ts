import { LocalContent } from "../../components/modules/admin/AdminInterfaces";

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
    url: string
}

export interface Article{
    id: string,
    title: string,
    categoryId: string,
    mainImage?: Image,
    images?: Image[],
    admin?:{
        localTitles: LocalContent
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