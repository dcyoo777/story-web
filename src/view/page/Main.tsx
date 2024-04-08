import React, {useEffect, useState} from 'react';
import axios from "axios";

Main.propTypes = {

};

function Main() {

    const [item, setItem] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:13917/ping").then((res) => setItem(res.data));
    }, []);

    return (
        <div>
            {item}
        </div>
    );
}

export default Main;
