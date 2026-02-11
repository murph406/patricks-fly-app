import React from 'react'

const useSearch = () => {
    const ref = React.useRef()
    const [search, setSearch] = React.useState('')

    function set(value) {
        setSearch(value)
    }

    function clear() {
        setSearch('')
    }

    return {
        value: search,
        clear,
        set,
        ref
    }
}

export default useSearch
