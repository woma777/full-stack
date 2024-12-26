import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../service/EmployeeService'; // Make sure to import deleteEmployee service
import { useNavigate } from 'react-router-dom';

function ListEmployee() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const addNewEmployee = () => {
        navigate('/add-employee');
    };

    const updateEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await deleteEmployee(id); // Call the delete function
            // Remove the deleted employee from the state
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployee;
