// components/TableComponent.tsx
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addItem, removeItem, updateItem } from '../redux/slices/dataSlice';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';



const TableComponent = () => {
    const rows = useSelector((state) => state.data.items);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState({ id: 0, name: '', age: 0 });

    const handleOpen = (item) => {
        setEditingItem(item);
        setForm(item ? item : { id: rows.length + 1, name: '', age: 0 });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (editingItem) {
            dispatch(updateItem(form));
        } else {
            dispatch(addItem(form));
        }
        handleClose();
    };

    const handleDelete = (id) => {
        dispatch(removeItem(id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'age', headerName: 'Age', width: 110, editable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button onClick={() => handleOpen(params.row)}>Edit</Button>
                    <Button onClick={() => handleDelete(params.row.id)}>Del</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Add New Item
            </Button>
            <DataGrid rows={rows} columns={columns} autoHeight pageSize={5} />

            {/* Dialog for Add/Edit Form */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TableComponent;
