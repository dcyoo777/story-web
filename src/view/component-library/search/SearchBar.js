import Filter from '../filter/Filter';
import './SearchBar.scss';
import { useState } from 'react';
import SearchInput from '../input/SearchInput';

export const SINGLE_SELECT_TYPE = 0;
export const MULTIPLE_SELECT_TYPE = 1;
export const SELECT = 0;
export const INPUT = 1;

function SearchBar(props) {
    const { searchList, getDataByFilter } = props;
    const [searchOption, setSearchOption] = useState({});
    const [filterId, setFilterId] = useState();

    // const filterList = searchList.filter(el => el.type === SELECT);
    const inputList = searchList.filter(el => el.type === INPUT);

    return (
        <div id="SearchBar">
            {/* <div className="filter-wrapper">
                {filterList.map((el, index) => {
                    return (
                        <Filter
                            data={el}
                            filterId={filterId}
                            setFilterId={setFilterId}
                            searchOption={searchOption}
                            setSearchOption={setSearchOption}
                            getDataByFilter={getDataByFilter}
                            key={`filter ${index} ${el.label}`}
                        />
                    );
                })}
            </div> */}
            <SearchInput
                inputList={inputList}
                searchOption={searchOption}
                setSearchOption={setSearchOption}
                getDataByFilter={getDataByFilter}
            />
        </div>
    );
}

export default SearchBar;
