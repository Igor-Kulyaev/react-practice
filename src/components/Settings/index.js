import { useContext, useMemo, useState, memo } from 'react';

import { AppContext } from '../../providers/context';

import { LOCALES } from '../../providers/i18n';

import { useBooleanToggle } from '../../hooks';

import { saveToStorage } from '../../utils/sessionStorage';

const Test = memo(({ data }) => {
    console.log('rendering');

    return <div>{JSON.stringify(data)}</div>
})

const Setting = () => {
    const { state, dispatch } = useContext(AppContext);
    const { status, handleStatusChange } = useBooleanToggle();
    // const [isAdvancedSettingsShown, setIsAdvancedSettingsShown] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;

        dispatch({
            type: 'changeCurrency',
            currency: value
        })
    }

    const onChangeLocale = (e) => {
        const { value } = e.target;

        dispatch({
            type: 'setLocale',
            locale: value
        });

        saveToStorage('locale', value)
    }

    const data = useMemo(() => [2], []);

    return (
        <>
            <h1>Settings</h1>

            <Test data={data} />

            <div>
                <form>
                    <div>
                        <label>
                            Currency:

                            <select name="currency"
                                onChange={onChange}
                                value={state.currency}>
                                <option value="UAH">Hryvnia</option>
                                <option value="USD">Dollar</option>
                                <option value="EUR">Euro</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Language:

                            <select name="locale"
                                onChange={onChangeLocale}
                                value={state.locale}>
                                <option value={LOCALES.UKRAINIAN}>Українська</option>
                                <option value={LOCALES.ENGLISH}>English</option>
                            </select>
                        </label>
                    </div>
                </form>
            </div>

            <div>
                <button onClick={handleStatusChange}>Extended settings</button>

                {status ? (
                    <div>
                        <h2>Extended settings</h2>
                        <p>...</p>
                    </div>
                ) : null}

            </div>
        </>
    )
};

export default Setting;