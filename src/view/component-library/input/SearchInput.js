import './SearchInput.scss';
import DebounceInput from './DebounceInput';
import { useState } from 'react';

function SearchInput(props) {
    const { searchOption, setSearchOption, inputList, getDataByFilter } = props;
    const [value, setValue] = useState('');
    const [selectedSearchOption, setSelectedSearchOption] = useState(
        inputList[0],
    );

    const [isSearchOptionOpen, setIsSearchOptionOpen] = useState(false);
    const clickSearchOption = el => {
        setValue('');
        let resetSearchOption = searchOption;
        delete resetSearchOption[selectedSearchOption.id];
        setSearchOption(resetSearchOption);
        getDataByFilter(resetSearchOption);
        setSelectedSearchOption(el);
        setIsSearchOptionOpen(false);
    };
    const debouncedFunction = inputValue => {
        setValue(inputValue);
        setSearchOption(
            inputValue.length
                ? { ...searchOption, [selectedSearchOption.id]: inputValue }
                : { ...searchOption, [selectedSearchOption.id]: [] },
        );
        getDataByFilter(
            inputValue.length
                ? { ...searchOption, [selectedSearchOption.id]: inputValue }
                : { ...searchOption, [selectedSearchOption.id]: [] },
        );
    };

    return (
        <div id="SearchInput">
            {isSearchOptionOpen && (
                <div className="search-options-wrapper">
                    {inputList.map((el, index) => {
                        return (
                            <div
                                className="search-option"
                                style={el.style}
                                key={`${el.id} search-option ${index}`}
                                onClick={() => clickSearchOption(el)}>
                                {el.icon && (
                                    <img
                                        src={el.icon}
                                        alt="icon"
                                        className="search-option-img"
                                    />
                                )}
                                {el.label}
                            </div>
                        );
                    })}
                </div>
            )}
            <div
                className="selected-search-option"
                onClick={() => setIsSearchOptionOpen(!isSearchOptionOpen)}>
                {selectedSearchOption.label}
            </div>
            <DebounceInput
                debouncedFunction={debouncedFunction}
                value={value}
                setValue={setValue}
                dependency={[selectedSearchOption, searchOption]}
                style={{ padding: '10px', height: '30px' }}
            />
        </div>
    );
}

export default SearchInput;
