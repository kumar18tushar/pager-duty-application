export interface DeveloperResponseObj {
    id: string
    name: string
    phone_number: string
}

export interface TeamResponseObj {
    id: string
    name: string
    developers: Array<string>
}