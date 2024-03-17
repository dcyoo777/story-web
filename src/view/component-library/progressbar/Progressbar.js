import {useMemo} from "react";
import "./Progressbar.scss";

const Progressbar = ({percent}) => {
  const percentWidth = useMemo(() => {
    let result;
    if (percent > 100) {
      result = 100;
    } else {
      result = percent;
    }
    return result;
  }, [percent]);

  return (
    <div className="progressbar">
      <div className="progressbar-back"></div>
      <div className="progressbar-front" style={{width: `${percentWidth}%`}}></div>
    </div>
  );
};

export default Progressbar;
