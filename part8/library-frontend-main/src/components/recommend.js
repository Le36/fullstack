import {useQuery} from "@apollo/client"
import {ALL_BOOKS, MY_GENRE} from "../queries"

const Recommend = (props) => {
    const genreResult = useQuery(MY_GENRE)
    const bookResult = useQuery(ALL_BOOKS)

    if (!props.show) {
        return null
    }

    if (genreResult.loading || bookResult.loading) {
        return <div>loading...</div>
    }

    if (genreResult.data && bookResult.data) {
        const genreBooks = bookResult.data.allBooks
        const myGenre = genreResult.data.me.favoriteGenre

        return (
            <div>
                <h2>recommendations</h2>
                books in your favorite genre <b>{myGenre}</b>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {genreBooks.filter(g => g.genres.includes(myGenre))
                        .map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Recommend
