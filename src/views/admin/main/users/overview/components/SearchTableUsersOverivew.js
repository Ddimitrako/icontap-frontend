import DataTable from 'react-data-table-component';
import {Flex,SimpleGrid} from "@chakra-ui/react";
import React, {useState, useCallback, useMemo,} from 'react';
import {Button} from "@chakra-ui/react";
import differenceBy from 'lodash/differenceBy';
import AdminActionsBtn from "./AdminActions";
const columns = [
    {
        name: 'Username',
        selector: row => row.username,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Company',
        selector: row => row.company,
        sortable: true,
    },
    {
        name: 'JOIN DATE',
        selector: row => row.joinDate,
        sortable: true,
    },
    {
        name: 'USER TYPE',
        selector: row => row.userType,
        sortable: true,
    },
];

const tableDataItems = [
    {
        id: 1,
        username: 'Vlad Mihalache',
        email: 'vald@emaai.com',
        company:"moderna",
        joinDate:"14-1-1994",
        userType:"User"
    },
    {
        id: 2,
        username: 'Itoudis',
        email: 'vald@emaai.com',
        company:"moderna",
        joinDate:"13-1-1994",
        userType:"User"
    },
    {
        id: 3,
        username: 'Lostas kala',
        email: 'vald@emaai.com',
        company:"moderna",
        joinDate:"10-1-1993",
        userType:"User"
    },
    {
        id: 4,
        username: 'VDimitris Vlad',
        email: 'vald@emaai.com',
        company: "moderna",
        joinDate: "1-1-1994",
        userType: "User"
    }

]


function UsersTable() {

    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [data, setData] = React.useState(tableDataItems);

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
        console.log(state.selectedRows)
    }, []);

    const contextActions = React.useMemo(() => {
        const handleSelection = () => {

            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
                setToggleCleared(!toggleCleared);
                setData(differenceBy(data, selectedRows, 'title'));
            }
        };

        return (
            <div>
            <Button key="editcard" onClick={handleSelection} style={{backgroundColor: 'blueviolet'}} icon>
                Edit User Cards
            </Button>
            <Button key="statistics" onClick={handleSelection} style={{backgroundColor: 'green'}} icon>
                View User Statistics
            </Button>
            <Button key="delete" onClick={handleSelection} style={{backgroundColor: 'red'}} icon>
                Delete
            </Button>
                </div>
        );
    }, [data, selectedRows, toggleCleared]);


    return (
        <div>
        <Flex
                    align={{sm: "flex-start", lg: "flex-start"}}
                    justify={{sm: "flex-start", lg: "flex-start"}}
                    w='100%'
                    px='22px'
                    mb='36px' >

                    <AdminActionsBtn />
        </Flex>
        <DataTable
            title="User List"
            columns={columns}
            data={data}
            selectableRows
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            pagination
            defaultSortFieldId={1}

        /></div>
    );
};

export default UsersTable;