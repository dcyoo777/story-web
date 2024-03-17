import './DebounceInput.scss';
import Input from './Input';
import useDebounce from '../../../hooks/useDebounce';

function DebounceInput(props) {
    const {
        value,
        setValue,
        debouncedFunction,
        delay = 300,
        dependency = [],
        description,
        type = 'text',
        className = '',
        wrapperStyle,
        ...rest
    } = props || {};

    const { debounce } = useDebounce(debouncedFunction, delay, dependency);

    const onChangeFunc = e => {
        debounce(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className={'debounce-input'} style={wrapperStyle && wrapperStyle}>
            <Input
                type={type}
                className={className}
                onChange={onChangeFunc}
                value={value}
                {...rest}
            />
            {Boolean(description) && (
                <p className="input-description">{description}</p>
            )}
        </div>
    );
}

export default DebounceInput;
