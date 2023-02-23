import { FunctionComponent } from 'react'
import { SearchComponent } from '../components/SearchComponent'

export const HomePage: FunctionComponent = () => {
    return (
        <div className="Home">
            <SearchComponent />
        </div>
    )
}