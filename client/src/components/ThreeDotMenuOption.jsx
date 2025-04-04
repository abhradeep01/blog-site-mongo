import React from "react";
import PropTypes from 'prop-types';

function ThreeDotMenuOption ({text,icon,color}) {
    return(
        <div className="w-full flex flex-row items-center gap-3">
            <div>{icon}</div>
            <div>
                <h4 className={`text-[0.9rem] font-[350] capitalize ${color}`}>
                    {text}
                </h4>
            </div>
        </div>
    )
}

ThreeDotMenuOption.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired
}

export default ThreeDotMenuOption;