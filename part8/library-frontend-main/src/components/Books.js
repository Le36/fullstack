import {useQuery} from "@apollo/client";
import {ALL_BOOKS, FIND_GENRES} from "../queries";
import {useState} from "react";

const Books = (props) => {
    const [selectedGenre, setGenre] = useState(null)
    const result = useQuery(ALL_BOOKS)
    const {loading, data, refetch} = useQuery(FIND_GENRES, {
        variables: {selectedGenre},
        skip: !selectedGenre
    })

    if (!props.show) {
        return null
    }

    if (result.loading || loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks

    const uniqueGenres = new Set()
    books.map(b => b.genres.map(g => uniqueGenres.add(g)))
    const filteredGenres = [...uniqueGenres]

    const onClickRefetch = (genre) => {
        setGenre(genre)
        if (genre) refetch({selectedGenre: genre})
    }

    const GenreButtons = () => {
        return (
            <div>
                {filteredGenres.map(g => {
                    return <button key={g} onClick={() => onClickRefetch(g)}>{g}</button>
                })}
                <button onClick={() => onClickRefetch(null)}>all genres</button>
            </div>
        )
    }

    if (selectedGenre && data) {
        const genreBooks = data.allBooks

        return (
            <div>
                <h2>books</h2>
                in genre <b>{selectedGenre}</b>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {genreBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <GenreButtons/>
            </div>
        )
    }

    return (
        <div>
            <h2>books</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <GenreButtons/>
        </div>
    )
}

export default Books
