import { LocalContent } from "../../components/modules/admin/AdminInterfaces";

export interface ArticleEditLangRedux {
    id: string,
    mainImage?: string,
    localContent: LocalContent
}