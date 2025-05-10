import { useContext, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const JerseyDetails = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useContext(AuthContext)
    const jerseys = useLoaderData();
    const navigate = useNavigate();

    const { id } = useParams()
    // // const intId = parseInt(id)
    console.log(jerseys, id ,"dfdfs");
    // const spots = jerseys.find(spot => spot._id == id);

    const {
        _id,
        jerseyName,
        jerseyQuantity,
        price,
        jerseyImage,
        pickupLocation,
        expiredDate,
        additionalNotes,
        donatorName,
        donatorEmail,
        donatorImage } = jerseys;

    const handleRequest = e => {
        e.preventDefault();
        const { _id, additionalNotes, jerseyStatus, ...restjerseys } = jerseys;
        const jersey = {
            jerseyStatus: 'requested',
            ...restjerseys,
            additionalNotes: e.target.additionalnotes.value,
            requestDate: startDate,
            requestEmail: user.email,
        }
        console.log('delete okkk', _id, jerseyStatus, jersey, additionalNotes);

        axios.put(`${import.meta.env.VITE_URL}/alljerseysupdate/${_id}`, jersey)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    console.log('updatejersey done')

                    axios.post(`${import.meta.env.VITE_URL}/requestjerseys`, jersey)
                        .then(res => {
                            console.log(res.data, 'post done')
                            if (res.data.insertedId) {
                                navigate('/myjerseyRequest')
                            }
                        })

                    // const remeningjersey = jerseys.filter(jersey => jersey._id !== _id);
                    // setMyjerseys(remeningjersey)

                }

            })
    }
    return (
        <div className="font-open-sans space-y-5 mx-4 lg:mx-12 ">
            <Helmet className="text-sm">
                <title className="">{`Athlete Dress | ${jerseyName}`}</title>
            </Helmet>
            <Fade cascade duration={2000}>

                <div className=" mt-5 flex flex-col items-center gap-3 md:flex-row">
                    <div className="  md:w-2/3">
                        <img className="w-full lg:h-[500px] rounded-lg" src={jerseyImage} alt="" />
                    </div>

                    <div className="text-xl flex flex-col justify-between lg:px-10">
                        <div className=" flex flex-col md:flex-row items-center lg:gap-10">

                            <div className=" space-y-3 lg:space-y-5">
                                <h1 className=" font-bold text-2xl ">{jerseyName}</h1>
                                <p>Price : {price}</p>
                                <p> <span className=" lg:mr-6">Pickup Location : </span> {pickupLocation ? pickupLocation : "location not found"}</p>
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            {/* <button className="btn w-full bg-secondary ">Request</button> */}
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn  bg-green-500 text-3xl text-red-500" onClick={() => document.getElementById('my_modal_2').showModal()}>Request</button>
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box md:max-w-[800px]">
                                    <form onSubmit={handleRequest} className="   font-open-sans card-body mb-6 border rounded-lg border-gray-400 lg:w-5/6 mx-auto">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">jersey Name :</span>
                                            </label>
                                            <input type="text" defaultValue={jerseyName} name="jerseyname" className="input outline-none border-gray-200" readOnly />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">jersey Image</span>
                                            </label>
                                            <input type="text" defaultValue={jerseyImage} name="jerseyimage" className="input input-bordered" readOnly />
                                        </div>
                                        <div className="form-control  ">
                                            <label className="label">
                                                <span className="label-text font-medium">jersey Id :</span>
                                            </label>
                                            <input type="text" name="jerseyquantity" defaultValue={_id} className="input input-bordered" readOnly />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Donator Email :</span>
                                            </label>
                                            <input type="text" defaultValue={donatorEmail} name="email" placeholder="User Email" className="input input-bordered" readOnly />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Donator Name :</span>
                                            </label>
                                            <input type="text" defaultValue={donatorName} name="name" placeholder="User Name" className="input input-bordered" readOnly />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">User Email :</span>
                                            </label>
                                            <input type="text" defaultValue={user.email} name="email" placeholder="User Email" className="input input-bordered" readOnly />
                                        </div>
                                        <div className="form-control ">
                                            <label className="label">
                                                <span className="label-text font-medium">Request Date/Time :</span>
                                            </label>
                                        </div>
                                        <DatePicker dateFormat="dd/MM/YYYY" readOnly className=" border border-gray-500 md:p-3 text-sm md:text-xl rounded-lg" name="requestDate" selected={startDate} onChange={(date) => setStartDate(date)} />
                                        <div className="form-control ">
                                            <label className="label">
                                                <span className="label-text font-medium">Pickup Location :</span>
                                            </label>
                                            <input type="text" name="pickuplocation"
                                                defaultValue={pickupLocation} className="input input-bordered" readOnly />
                                        </div>
                                        <div className="form-control ">
                                            <label className="label">
                                                <span className="label-text font-medium">Expire Date/Time :</span>
                                            </label>
                                            <DatePicker dateFormat="dd/MM/YYYY" readOnly defaultValue={expiredDate} className=" border border-gray-500 md:p-3 text-sm md:text-xl rounded-lg" name="expiredDate" selected={expiredDate} onChange={(date) => setStartDate(date)} />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Additional Notes :</span>
                                            </label>

                                            <textarea defaultValue={additionalNotes} cols={5} rows={2} name="additionalnotes" placeholder="Additional Notes" type="text" className=" outline-none border border-gray-500 rounded-lg"></textarea>
                                        </div>
                                        <div className="form-control mt-2">
                                            <button className="btn bg-orange-400  ">Request</button>
                                        </div>
                                    </form>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                    </div>
                </div>


            </Fade>
        </div>
    );
};

export default JerseyDetails;