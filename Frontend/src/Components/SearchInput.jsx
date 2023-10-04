/* eslint-disable react/prop-types */

export const SearchInput = ({query, setQuery}) => {
  return (
    <div className="flex mb-2">
            <input
            id="search"
            name="search"
            type="search"
            autoComplete="current-searc"
            required
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
  )
}
