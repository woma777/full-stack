import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployeeById, updateEmployee } from '../service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [errors, setErrors] = useState({}); // For individual field errors
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch employee details for update if an id is present
    useEffect(() => {
        if (id) {
            getEmployeeById(id).then(response => {
                const employee = response.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmailId(employee.emailId);
            }).catch(error => {
                console.error('Error fetching employee data', error);
            });
        }
    }, [id]);

    const validateFields = () => {
        const newErrors = {};

        // Validate first name
        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        } else if (firstName.length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters long.';
        }

        // Validate last name
        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        } else if (lastName.length < 2) {
            newErrors.lastName = 'Last name must be at least 2 characters long.';
        }

        // Validate email
        if (!emailId.trim()) {
            newErrors.emailId = 'Email is required.';
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailId)) {
            newErrors.emailId = 'Invalid email format.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveEmployee = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return; // Stop submission if validation fails
        }

        const employee = { firstName, lastName, emailId };

        try {
            if (id) {
                // Update existing employee
                const response = await updateEmployee(id, employee);
                console.log(response.data);
                navigate('/employees'); // Redirect on success
            } else {
                // Create new employee
                const response = await createEmployee(employee);
                console.log(response.data);
                navigate('/employees'); // Redirect on success
            }
        } catch (err) {
            console.error(err);
            setErrors({ ...errors, general: 'Failed to save employee. Please try again.' });
        }
    };

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        } else {
            return <h2 className="text-center">Add Employee</h2>;
        }
    }

    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            {errors.general && <p className="text-danger">{errors.general}</p>}
                            <div className="form-group mb-2">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Employee First Name"
                                    name="firstName"
                                    value={firstName}
                                    className="form-control"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Employee Last Name"
                                    name="lastName"
                                    value={lastName}
                                    className="form-control"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Email Id</label>
                                <input
                                    type="email"
                                    placeholder="Enter Employee Email Id"
                                    name="emailId"
                                    value={emailId}
                                    className="form-control"
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                                {errors.emailId && <p className="text-danger">{errors.emailId}</p>}
                            </div>
                            <button className="btn btn-success" onClick={saveEmployee}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
