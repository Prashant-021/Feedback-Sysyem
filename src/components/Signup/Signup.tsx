import React, { useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { SignUpSchema } from '../../schema';
import { RootState, User } from '../../interface';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/slice/slice';
import { Checkbox, Input } from '@material-tailwind/react';

type Props = {};



const initialValues: User = {
    profilepicture: null,
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const Signup = (props: Props) => {
    const users = useSelector((state: RootState) => state.user?.userList);

    const [showPassword, setshowPassword] = useState<boolean>(false)
    const Navigate = useNavigate()

    useLayoutEffect(() => {
        if (sessionStorage.length !== 0) {
            Navigate('/dashboard')
        }
    }, [Navigate])

    const dispatch = useDispatch();
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values: User) => {
            const userExists = users.find(user => user.name === values.name)
            if (!userExists) {
                dispatch(addUser(values));
                sessionStorage.setItem("currentUser", values.email)
                Navigate('/dashboard')
            }
            else {
                alert("User Already Exists")
                resetForm()
            }

        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader()

            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                    const imageUrl = e.target.result as string;
                    setFieldValue('profilepicture', imageUrl);
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className='flex w-full'>
            <div className='w-1/2 bg-[#005ae6]  hidden md:flex'>
                <div className='w-full px-4 py-7'>
                    <p className='text-4xl text-center font-bold text-white me-3'>SignUp</p>
                    <div className='w-full flex justify-center'>
                        <img src="/img/Signup.svg" width={"70%"} alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 bg-white p-5 flex flex-col justify-center items-center'>
                <p className='text-4xl text-center font-bold md:hidden me-3'>SignUp</p>
                <form action="" onSubmit={handleSubmit}>

                    <div className="inputGroup pb-4 pt-4">
                        <Input label='Username' name='name' type="text" className='bg-inherit outline-0 ' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        {errors.name && touched.name ? (<p className='text-red-600 absolute'>{errors.name}</p>) : null}
                    </div>

                    <div className="inputGroup pb-4 pt-4">
                        <Input label='Email' name='email' type="email" className='bg-inherit outline-0 ' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email ? (<p className='text-red-600 absolute'>{errors.email}</p>) : null}
                    </div>
                    <div className="inputGroup pb-2 pt-4">

                        <Input label='Password' name='password' type={showPassword ? "text" : "password"} autoComplete="off" className=' bg-inherit  outline-0 ' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                        {errors.password && touched.password ? (<p className='text-red-600 absolute'>{errors.password}</p>) : null}
                    </div>
                    <div className="">
                        <Checkbox label={showPassword ? "Hide Password" : "Show Password"} onClick={() => { setshowPassword(prevshowPassword => !prevshowPassword) }} name='togglePassword' />
                    </div>
                    <div className="inputGroup pb-5 pt-4">
                        <Input label='Confirm Password' name='confirmPassword' type="password" autoComplete="off" className='bg-inherit outline-0 ' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                        {errors.confirmPassword && touched.confirmPassword ? (<p className='text-red-600 absolute'>{errors.confirmPassword}</p>) : null}
                    </div>
                    <div className="inputGroup pb-4 mb-3">
                        <input name='profilepicture' type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-[#005ae6]
                            hover:file:bg-violet-100
                        " accept="image/x-png,image/gif,image/jpeg"
                            onChange={handleFileChange}
                            onBlur={handleBlur}
                        />
                        {errors.profilepicture && touched.profilepicture ? (<p className='text-red-600 absolute'>{errors.profilepicture}</p>) : null}
                    </div>
                    <div className="submitSec w-full flex justify-center mt-3">
                        <button type="submit" className='py-2 px-8 bg-[#005ae6] rounded-md text-white hover:bg-black '>Sign Up</button>
                        <button type="reset" className='bg-red-500 rounded-md ms-3 p-2 text-white' onClick={() => resetForm()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                    </div>

                    <div className="infoSec py-2 text-center">
                        <p>Already have an account? <Link className='text-blue-500' to={'/login'}>Login</Link></p>
                    </div>
                </form>
            </div >

        </div >
    )
}

export default Signup

