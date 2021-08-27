const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, b) => acc + b.likes, 0)

const favoriteBlog = (blogs) => blogs.find(b => b.likes === Math.max(...blogs.map(b => b.likes)))

const mostBlogs = (blogs) => {
    const authors = blogs.reduce((authors, b) => {
        authors[b.author] = authors[b.author] ? authors[b.author] + 1 : 1
        return authors
    }, {})

    const mostBlogs = Math.max(...Object.values(authors))
    const [author, count] = Object.entries(authors).find(([_, bCount]) => bCount === mostBlogs)
    return {
        author,
        blogs: count
    }
}

const mostLikes = (blogs) => {
    const authors = blogs.reduce((authors, b) => {
        authors[b.author] = authors[b.author] ? authors[b.author] + b.likes : b.likes
        return authors
    }, {})

    const mostBlogs = Math.max(...Object.values(authors))
    const [author, likes] = Object.entries(authors).find(([_, bCount]) => bCount === mostBlogs)
    return {
        author,
        likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}