import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    return <>
        <ul className="list-group">
            {/* {Object.keys(items).map(item =>
                <li onClick={() => onItemSelect(items[item])} key={items[item][valueProperty]} className={"list-group-item" + (items[item] === selectedItem ? " active" : "")} role="button">
                    {items[item][contentProperty]}
                </li>
            )} */}

            {items.map(item =>
                <li onClick={() =>
                    onItemSelect(item)} key={item._id} className={"list-group-item" + (item === selectedItem ? " active" : "")} role="button">
                    {item.name}
                </li>
            )}

        </ul>
    </>;
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
