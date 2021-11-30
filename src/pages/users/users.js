import "./users.scss";
import {useEffect, useState} from "react";
// import axios from "axios";
// import {NavLink} from "react-router-dom";


const Users = () => {
    /**
     * set local state
     */
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    const [filteredUsers, setFilteredUsers] = useState([]);


    /**
     * when the params change, update the request and local state
     */
    useEffect(() => {
        setIsLoading(true);

        fetch("json/users.json",
            {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log("RES", res);
                setUsers(res.users);    //  full unfiltered list
                setFilteredUsers(res.users);    //  initial
            })
            .catch(() => {
                alert("ERROR");
            })
            .finally(setIsLoading(false));
    }, []);



    /**
     * map over users
     */
    function UserList() {
        return (
            filteredUsers.map((user, index) => {
                return (
                    <article
                        className="prod-card"
                        map={user.id}
                    >
                        <h1>{user.firstName} {user.lastName}</h1>
                    </article>
                );
            })
        )
    }


    /**
     * main render
     */
    return (
        <>
            <h1>Users</h1>

            <aside className="filters">
                <div>
                    <p
                        onClick={() => {
                            setFilteredUsers(users);
                        }}
                    >
                        Reset all filters
                    </p>

                    <p>
                        Filter by:

                        <span
                            onClick={() => {
                                filterBy('male')
                            }}
                        >
                            Male
                        </span>

                        <span
                            onClick={() => {
                                filterBy('female')
                            }}
                        >
                            Female
                        </span>
                    </p>
                </div>

                <div>
                    <p>
                        Sort by:

                        <span
                            onClick={() => {
                                sortBy();
                            }}
                        >
                            A-Z
                        </span>
                    </p>
                </div>
            </aside>

            <form>
                <label htmlFor="filter">Search: </label>
                <input
                    id="filter"
                    type="text"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);

                        filterResults(e.target.value);
                    }}
                />
                {filter}
            </form>

            {
                isLoading
                ?
                    <p>Loading, please wait...</p>
                :
                    <>
                        {
                            users
                                ?
                                <>
                                    {
                                        filteredUsers && filteredUsers.length
                                            ?
                                            <p>showing {filteredUsers.length} of {users.length}</p>
                                            :
                                            ''

                                    }

                                    <section>
                                        {
                                            filteredUsers && filteredUsers.length
                                                ?
                                                <UserList />
                                                :
                                                ''
                                        }
                                    </section>
                                </>
                                : ''
                        }
                    </>
            }
        </>
    );


    //  METHODS
    function filterResults(e) {
        if (e.length) {
            let copyUsers = [...users];

            const filtered = copyUsers.filter((name) => {
                return (name.firstName === e);
            });

            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);    //  if 0, reset
        }
    }

    function filterBy(val) {
        let copyUsers = [...users];

        const filtered = copyUsers.filter((user) => {
            return (user.gender === val);
        });

        setFilteredUsers(filtered);
    }


    function sortBy() {
        let copyUsers = [...filteredUsers];

        copyUsers.sort(compare);

        setFilteredUsers(copyUsers);
    }

    function compare(a, b) {
        const userA = a.firstName.toUpperCase();
        const userB = b.firstName.toUpperCase();

        let comparison = 0;

        if (userA > userB) {
            comparison = 1;
        } else if (userA < userB) {
            comparison = -1;
        }

        return comparison;
    }

}

export default Users;