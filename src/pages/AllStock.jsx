import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import useCommonAxios from "../hooks/useCommonAxios";
import { CgPacman } from "react-icons/cg";

const AllStock = () => {
    const commonAxios = useCommonAxios()
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const { user } = useContext(AuthContext)
    const [jerseys, setMyjerseys] = useState([])
    useEffect(() => {
        const getData = async () => {
            const { data } = await commonAxios("/allJerseys")
            console.log(data,"data get")
            setMyjerseys(data)
        }
        getData()
    }, [user])
    console.log(jerseys,"data usetsss")
    const handleDeletejersey = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('delete', _id)
                commonAxios.delete(`/jerseydelete/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            const remeningjersey = jerseys.filter(jersey => jersey._id !== _id);
                            setMyjerseys(remeningjersey)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })
            }
        });

    }
    return (
        <div className="  text-cyan-950 shadow-lg  bg-slate-500">
            <Helmet>
                <title>Athlete Dress | All Stock </title>
            </Helmet>
                <h2 className="font-poppins font-medium  text-3xl lg:hidden  text-center mb-10  mt-5">Manage My jerseys</h2>
                <div>
                    <div className="overflow-x-auto md:px-8 lg:px-14">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className=" light:bg-gray-200 text-xl font-bold">
                                    <th>No</th>
                                    <th>Imageddd</th>
                                    <th>jersey Name</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    jerseys.map((jersey, inx) => <tr key={inx} className="hover">
                                        <th>{inx + 1}</th>
                                        <td><img className="w-[70px] rounded-lg" src={jersey.jerseyImage} alt="" /></td>
                                        <td>{jersey.jerseyName}</td>
                                        <td>{jersey.jerseyQuantity}</td>
                                        <td > <button className={" btn text-white " + (jersey.jerseyStatus === 'available' ? 'bg-green-500' : 'bg-red-500')}>{jersey.jerseyStatus}</button></td>
                                        <td> <Link to={`/updatedPages/${jersey._id}`}>
                                            <button className="btn  hover:btn-info"><FaRegEdit className=" text-2xl" /></button>
                                        </Link></td>
                                        <td><button onClick={() => handleDeletejersey(jersey._id)} className="btn  hover:btn-ghost"><MdDelete className=" text-red-600 text-3xl" /></button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
};

export default AllStock;