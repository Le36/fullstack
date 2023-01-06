const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((mostLikes, current) => {
        if (current.likes > mostLikes.likes) {
            return current;
        }
        return mostLikes;
    });
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}