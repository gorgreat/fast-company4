import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import API from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };

    const handleReset = (item) => {
        setSelectedProf(item);
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) =>
            // setProfessions(Object.assign(data, { allProfession: { name: "Все профессии" } })));
            setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const filteredUsers = selectedProf && selectedProf._id ? users.filter((user) => user.profession.name === selectedProf.name) : users;

    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    return (
        <div className="d-flex">
            {professions &&
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList items={professions} onItemSelect={handleProfessionsSelect} selectedItem={selectedProf} />
                    <button onClick={handleReset} className="btn btn-primary mt-2">Очистить</button>
                </div>
            }
            {count > 0 && (
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Провфессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex">
                        <Pagination currentPage={currentPage} itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} />
                    </div>
                </div>
            )}

        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
