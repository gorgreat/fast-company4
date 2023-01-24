import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import API from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UserTable from "./usersTable";

const Users = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState();

    useEffect(() => {
        API.users.fetchAll().then((data) =>
            setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };

    const handleReset = (item) => {
        setSelectedProf(item);
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) =>
            setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    if (users) {
        const filteredUsers = selectedProf && selectedProf._id ? users.filter((user) => _.isEqual(user.profession, selectedProf)) : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                        <UserTable users={userCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
                        <div className="d-flex">
                            <Pagination currentPage={currentPage} itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} />
                        </div>
                    </div>
                )}

            </div>
        );
    };
    return "loading...";
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
