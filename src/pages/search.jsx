import React, { useState, useEffect } from 'react'

const search = () => {
    let [search, setSearch] = useState()

    useEffect(() => {
        getSearch()
    }, [])

    let getSearch = async () => {
        let response = await fetch('/api/search')
        let data = await response.json()
        console.log('Search Result :', data);
    }

    return (
        <div>search</div>
    )
}

export default search