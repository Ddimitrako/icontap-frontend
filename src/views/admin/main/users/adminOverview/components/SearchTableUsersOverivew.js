import DataTable from 'react-data-table-component';
import {Flex,SimpleGrid} from "@chakra-ui/react";
import React, {useState, useCallback, useMemo,} from 'react';
import {Button} from "@chakra-ui/react";
import differenceBy from 'lodash/differenceBy';
import AdminActionsBtn from "./AdminActions";
import {useEffect} from "react";
import {Backdrop} from "@material-ui/core";
import styled from 'styled-components';
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
    // {
    //     name: 'Company',
    //     selector: row => row.company.name,
    //     sortable: true,
    // },
    {
        name: 'JOIN DATE',
        selector: row => row.created_at,
        sortable: true,
    },
    {
        name: 'COMPANY USER TYPE',
        selector: row =>  row.role_company ? row.role_company.name : "Not a company member",
        sortable: true,
    },
    {
        name: 'ACTIVE',
        selector: row => row.is_active,
        sortable: true,
    },
    {
        name: 'Edit card/s',
        selector: row => row.editCard,
        sortable: false,
    },
    // {
    //     name: 'Analytics',
    //     selector: row => row.analytics,
    //     sortable: false,
    // },
];
const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;
const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filter By Name"
			aria-label="Search Input"
		    value={filterText}
			onChange={onFilter}
		/>
		<Button type="button" onClick={onClear}>
			X
		</Button>
	</>
);

function UsersTable({usersList,setSelectedUsers,refreshUsersTable,setRefreshUsersTable}) {

    const [pending, setPending] = React.useState(true);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    // const [data, setData] = React.useState(usersList);

    //****************************************************************************

    const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const [filteredItems,setFilteredItems] = React.useState(usersList);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

    //****************************************************************************

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
        console.log(state.selectedRows)
        var userslist =[]
        setSelectedUsers([])
        state.selectedRows.map(({id,company})=>{
            if (company.length!=0){
                var obj = {user_id: id, company_id : company[0].id}
            }
            else{
                var obj = {user_id: id}
            }
            userslist.push(obj)

        })
        setSelectedUsers(userslist);

    }, []);



    useEffect(() => {
    }, [filteredItems]);

    useEffect(() => {
        setFilteredItems(usersList)
        setFilterText('')
    }, [usersList]);

    useEffect(() => {
        if ( usersList !==undefined){
        setFilteredItems(usersList.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	))
        console.log(filteredItems)
    }
    }, [filterText]);
    // React.useEffect(() => {
    //
	// }, []);
    // const contextActions = React.useMemo(() => {

        // const handleSelection = () => {

            // if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
            //     setToggleCleared(!toggleCleared);
            //     // setData(differenceBy(data, selectedRows, 'title'));
            // }
        // };

        // return (
        //     <div>
        //     <Button key="editcard" onClick={handleSelection} style={{backgroundColor: 'blueviolet'}} >
        //         Edit User Cards
        //     </Button>
        //     <Button key="statistics" onClick={handleSelection} style={{backgroundColor: 'green'}} >
        //         View User Statistics
        //     </Button>
        //     <Button key="delete" onClick={handleSelection} style={{backgroundColor: 'red'}} >
        //         Delete
        //     </Button>
        //         </div>
        // );
    // }, [ selectedRows, toggleCleared]);


    return (
        <div>

        <DataTable className="τεστ"

            title="Users List"
            columns={columns}
            data={filteredItems}
            selectableRows
            // contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            pagination
            // paginationResetDefaultPage={resetPaginationToggle}
            // progressPending={pending}
            defaultSortFieldId={1}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
        /></div>
    );
};

export default UsersTable;