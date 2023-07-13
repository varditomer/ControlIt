export interface Account extends Partner {
    _id: string
    url_code: string,
    name: string,
    partner_id: string
}

export interface Partner {
    _id: string,
    name: string
}