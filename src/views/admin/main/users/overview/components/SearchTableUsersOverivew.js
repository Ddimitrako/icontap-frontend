import DataTable from 'react-data-table-component';
import {Flex,SimpleGrid} from "@chakra-ui/react";
import React, {useState, useCallback, useMemo,} from 'react';
import {Button} from "@chakra-ui/react";
import differenceBy from 'lodash/differenceBy';
import AdminActionsBtn from "./AdminActions";
import {useEffect} from "react";
const columns = [
    {
        name: 'F.Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'L.Name',
        selector: row => row.last_name,
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
        selector: row => row.created_at,
        sortable: true,
    },
    {
        name: 'USER TYPE',
        selector: row => row.userType,
        sortable: true,
    },
    {
        name: 'Edit card/s',
        selector: row => row.editCard,
        sortable: false,
    },{
        name: 'Analytics',
        selector: row => row.analytics,
        sortable: false,
    },
];




function UsersTable(props) {
    const { testData1, testData2 ,usersList} = props;
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    // const [data, setData] = React.useState(usersList);

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
        console.log(state.selectedRows)
    }, []);

    // useEffect(() => {
    //     setData(usersList)
    // }, [usersList]);

    const contextActions = React.useMemo(() => {
        const handleSelection = () => {

            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
                setToggleCleared(!toggleCleared);
                // setData(differenceBy(data, selectedRows, 'title'));
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
    }, [ selectedRows, toggleCleared]);


    return (
        <div>

        <DataTable
            title="Users List"
            columns={columns}
            data={usersList}
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