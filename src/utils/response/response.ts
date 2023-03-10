const apiResponse = ({
    message,
    code,
    content,
}: {
    message: string
    code?: string
    content?: any
}) => {
    return {
        message,
        code,
        content,
    }
}

export default apiResponse
