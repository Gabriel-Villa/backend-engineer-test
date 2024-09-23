import axios from "axios"

const api = axios.create({
    baseURL: process.env.BASE_URL
})

async function getPosts(start, size) {
    const { data: posts } = await api.get("/posts")

    const adjustedStart = Math.max(0, start - 1)
    const paginatedPosts = posts.slice(adjustedStart, adjustedStart + size)

    if (!paginatedPosts.length) {
        throw createError(404, "No posts found")
    }

    const users = await getUsers()

    const usersMap = new Map(users.map((user) => [user.id, user]))

    const postsWithDetails = await Promise.all(
        paginatedPosts.map(async (post) => {
            const user = usersMap.get(post.userId)
            const comments = await getCommentsForPost(post.id)

            return formatPostWithDetails(post, user, comments)
        })
    )

    return postsWithDetails
}

function formatPostWithDetails(post, user, comments) {
    const formattedComments = comments.map(({ name, email, body }) => ({
        name,
        email,
        body
    }))

    return {
        id: post.id,
        title: post.title,
        body: post.body,
        user: {
            name: user.name || "Unknown",
            phone: user.phone || "Unknown",
            address: user.address || "Unknown"
        },
        comments: formattedComments
    }
}

async function getUsers() {
    const { data: users } = await api.get("/users")
    return users
}

async function getCommentsForPost(postId) {
    const { data: comments } = await api.get(`/posts/${postId}/comments`)
    return comments
}

function createError(statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}

export { getPosts, getUsers, getCommentsForPost }
