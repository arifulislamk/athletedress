import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCommonAxios from "../hooks/useCommonAxios";

const AddJersey = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const commonAxios = useCommonAxios()

  const { mutate } = useMutation({
    mutationFn: async (jersey) => {
      return await commonAxios.post('/alljerseys', jersey);
    },
    onSuccess: () => {
      navigate("/allStock");
      Swal.fire({
        title: "jersey Added done",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: () => {
      toast.error("error fount");
    },
  });

  const handleAddjersey = async (event) => {
    event.preventDefault();
    const form = event.target;
    const jerseyName = form.jerseyname.value;
    const jerseyQuantity = form.jerseyquantity.value;
    const jerseyImage = form.jerseyimage.value;
    const pickupLocation = form.pickuplocation.value;
    const expiredDate = startDate;
    const additionalNotes = form.additionalnotes.value;
    const donatorName = form.name.value;
    const donatorEmail = form.email.value;
    const donatorImage = form.userimage.value;
    const jerseyStatus = form.jerseystatus.value;
    console.log(
      jerseyName,
      jerseyQuantity,
      jerseyImage,
      pickupLocation,
      expiredDate,
      additionalNotes,
      donatorName,
      donatorEmail,
      donatorImage,
      jerseyStatus
    );
    const jersey = {
      jerseyName,
      jerseyQuantity,
      jerseyImage,
      pickupLocation,
      expiredDate,
      additionalNotes,
      donatorName,
      donatorEmail,
      donatorImage,
      jerseyStatus,
    };

    mutate(jersey);
  };

  return (
    <div>
      <Helmet>
        <title>Athlete Dress | Add Jersey</title>
      </Helmet>
      <form
        onSubmit={handleAddjersey}
        className="font-open-sans card-body space-y-4 mb-6 border rounded-lg text-cyan-950 shadow-lg bg-slate-300 md:w-5/6 mx-auto"
      >
        <h2 className="font-poppins font-medium  text-2xl lg:text-5xl text-center ">
          Add Jersey
        </h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl font-medium">
              Jersey Name :
            </span>
          </label>
          <input
            type="text"
            name="jerseyname"
            placeholder="jersey Name"
            className="input md:w-full input-bordered bg-slate-200"
            required
          />
        </div>
        <div className=" flex flex-col md:flex-row gap-5 ">
          <div className="form-control md:w-1/2 ">
            <label className="label">
              <span className="label-text text-xl font-medium">
                Jersey Quantity :
              </span>
            </label>
            <input
              type="text"
              name="jerseyquantity"
              placeholder="jersey Quantity"
              className="input w-full input-bordered bg-slate-200"
              required
            />
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text text-xl font-medium">
                Jersey Image: 
              </span>
            </label>
            <input
              type="text"
              name="jerseyimage"
              placeholder="jersey Image"
              className="input w-full input-bordered bg-slate-200"
              required
            />
          </div>
        </div>
        <div className=" flex flex-col md:flex-row gap-5 ">
          <div className="form-control  md:w-1/2">
            <label className="label">
              <span className="label-text text-xl font-medium">
                Pickup Location :
              </span>
            </label>
            <input
              type="text"
              name="pickuplocation"
              placeholder="Pickup Location"
              className="input w-full input-bordered bg-slate-200"
              required
            />
          </div>
          <div className="form-control md:w-1/2">
            <label className="label block">
              <span className="label-text text-xl font-medium">
                Expired Date/Time :
              </span>
            </label>
            <DatePicker
              dateFormat="dd/MM/YYYY"
              className=" border  w-full light:border-gray-500 bg-slate-200 p-3 text-xl rounded-lg"
              name="expiredDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl font-medium">
              Additional Notes :
            </span>
          </label>

          <textarea
            cols={10}
            rows={5}
            name="additionalnotes"
            placeholder="Additional Notes"
            type="text"
            className=" w-full outline-none border bg-slate-200  light:border-gray-500 rounded-lg"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donator Name :</span>
            </label>
            <input
              type="text"
              defaultValue={user.displayName}
              name="name"
              placeholder="User Name"
              className="input input-bordered bg-slate-200"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donator Email :</span>
            </label>
            <input
              type="text"
              defaultValue={user.email}
              name="email"
              placeholder="User Email"
              className="input input-bordered bg-slate-200"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Donator Image :</span>
            </label>

            <input
              type="text"
              defaultValue={user.photoURL}
              name="userimage"
              placeholder="User Image"
              className="input input-bordered bg-slate-200"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text"> jersey Status :</span>
          </label>
          <input
            type="text"
            defaultValue="available"
            name="jerseystatus"
            placeholder="jersey Status"
            className="input w-full input-bordered bg-slate-200"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-orange-400  ">Add Jersey</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddJersey;
