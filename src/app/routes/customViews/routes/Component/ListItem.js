import React from 'react';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

function ListItem({styleName, data}) {
    const {image, name, designation, description} = data;
    return (
        <div className={`user-list d-flex flex-row  ${styleName}`}>
            <Avatar
                alt='...'
                src={image}
                className="user-avatar avatar-shadow"
            />
            <div className="description">
                <h5>{name}</h5>
                <h6>{designation}</h6>
                <p className="text-muted">{description}</p>
                <ul className="list-inline d-sm-flex flex-sm-row jr-mbtn-list">
                    <li><Button color="primary">Modify</Button></li>
                    <li><Button color="secondary">Delete</Button></li>
                </ul>
            </div>

        </div>
    );
}

export default ListItem;