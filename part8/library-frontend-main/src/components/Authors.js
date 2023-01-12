import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, EDIT_AUTHOR} from "../queries";
import React, {useState} from "react";
import Select from "react-select";

const Authors = (props) => {

    const [born, setBorn] = useState('')
    const result = useQuery(ALL_AUTHORS)
    const [editAuthor] = useMutation(EDIT_AUTHOR)
    const [nameSelector, setNameSelector] = useState(null);

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const authors = result.data.allAuthors

    const options = authors.map(a => {
        return {value: a.name, label: a.name}
    })


    const submit = async (event) => {
        event.preventDefault()
        const name = nameSelector.value
        const setBornTo = Number(born)
        await editAuthor({variables: {name, setBornTo}})
        setBorn('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.map((a) => (
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2>set birthyear</h2>
            <form onSubmit={submit}>
                <Select
                    defaultValue={nameSelector}
                    onChange={setNameSelector}
                    options={options}
                />
                <div>
                    born
                    <input
                        value={born}
                        onChange={({target}) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default Authors
