export interface InitialStateType<T>
    {
        data : T | null
        isLoading : boolean
        isError : boolean
        isAuth? : boolean
    }

export interface IUser
    {
        email : string
        first_name : string
        get_full_name : string
        id : number
        image : string | null
        last_name : string
        middle_name : string
        phone : string | null
        role : string
        token : string
    }

export interface ICompany
    {
        id : number
        legal_name : string
        legal_address : string
        phone : string
        city : string
        index : string
        site_url : string
        image : string
        user: IUser
        balance : {
            balance : string
            id : number
            created_at : string
            days_transaction_closing: number
            amount : string
        }
    }

export interface ICategories {
        id : number
        name : string
        description : string
        created_at : string
        updated_at : string
    }
    
export interface ISubcategories
    {
        id : number
        name : string
        description : string
        image : string
        category : number
    }

export interface IColors
    {
        id : number
        color : string
        name : string
    }

export interface ICurrency
    {
        id : number
        name : string
        code : string
    }

export interface IMyItems
    {
        id : number
        name : string
        description : string
        main_features : string
        category : number
        subcategory : number
        image : string
        price : number
        currency : ICurrency
    }

export interface ICurrency {
    code : string
    id : number
    name : string
}

export interface ItemsTypes {
    category : number
    code : string
    company : ICompany
    description : string
    id : number
    main_features : string
    models_name : IModels
    name : string
    payment : IPayment
    subcategory : number
}

export interface IPayment {
  id : number
  created_at : string
  updated_at : string
  terms_of_payment : string
  delivery_conditions : string
}

export interface IModels {
    id : number
    color : IColors
    currency : ICurrency
    images : ImagesTypes
    item: number
    price : number
    name_model : string
    quantity : number
}

export interface ImagesTypes {
    id : number
    image : string
}