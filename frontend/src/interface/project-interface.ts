export interface Project {
    id: string,
    title: string,
    description: string,
    status: string,
    owner: {
        id: string,
        name: string,
        email: string
    }
}

