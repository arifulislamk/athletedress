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
  const commonAxios = useCommonAxios();

  const { mutate } = useMutation({
    mutationFn: async (jersey) => {
      return await commonAxios.post("/alljerseys", jersey);
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
    const productId = form.id.value;
    const m = form.m.value;
    const l = form.l.value;
    const xl = form.xl.value;
    const xl2 = form.xl2.value;
    const jerseyImage = form.jerseyimage.value;
    const price = form.price.value;
    const addDate = startDate;
    const additionalNotes = form.additionalnotes.value;
    const jerseyStatus = form.jerseystatus.value;
    console.log(
      jerseyName,
      productId,
      m,
      l,
      xl,
      xl2,
      jerseyImage,
      price,
      addDate,
      additionalNotes,
      jerseyStatus
    );
    const jersey = {
      jerseyName,
      productId,
      m,
      l,
      xl,
      xl2,
      jerseyImage,
      price,
      addDate,
      additionalNotes,
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
        <div className="flex gap-4">
          <div className="form-control w-1/2 ">
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
          <div className=" w-1/2">
            <label className="label">
              <span className="label-text text-xl font-medium">
                Product Id :
              </span>
            </label>
            <div className="w-[100%] flex border items-center justify-center ">
              <select
                type="text"
                defaultValue="ADB-1"
                name="id"
                className="select w-full font-bold text-xl rounded-lg bg-cyan-300 select-md"
              >
                <option>ADBAR-1</option>
                <option>ADBAR-2</option>
                <option>ADBAR-3</option>
                <option>ADRM-1</option>
                <option>ADRM-2</option>
                <option>ADRM-3</option>
                <option>ADINM-1</option>
                <option>ADINM-2</option>
                <option>ADPSG-1</option>
                <option>ADPSG-2</option>
                <option>ADMIA-1</option>
                <option>ADMIA-2</option>
                <option>ADBIJUS-1</option>
              </select>
            </div>
          </div>
        </div>
        <div className=" flex flex-col md:flex-row gap-5 ">
          <div className="form-control md:w-1/2 ">
            <label className="label">
              <span className="label-text text-xl font-medium">M :</span>
            </label>
            <input
              type="text"
              name="m"
              placeholder="quantity"
              className="input w-full input-bordered bg-slate-200"
            />
          </div>
          <div className="form-control md:w-1/2 ">
            <label className="label">
              <span className="label-text text-xl font-medium">L :</span>
            </label>
            <input
              type="text"
              name="l"
              placeholder="quantity"
              className="input w-full input-bordered bg-slate-200"
            />
          </div>
          <div className="form-control md:w-1/2 ">
            <label className="label">
              <span className="label-text text-xl font-medium">XL :</span>
            </label>
            <input
              type="text"
              name="xl"
              placeholder="quantity"
              className="input w-full input-bordered bg-slate-200"
            />
          </div>
          <div className="form-control md:w-1/2 ">
            <label className="label">
              <span className="label-text text-xl font-medium">2XL :</span>
            </label>
            <input
              type="text"
              name="xl2"
              placeholder="quantity"
              className="input w-full input-bordered bg-slate-200"
            />
          </div>
        </div>
        <div className=" flex flex-col md:flex-row gap-5 ">
          <div className="form-control  md:w-1/2">
            <label className="label">
              <span className="label-text text-xl font-medium">Price :</span>
            </label>
            <input
              type="text"
              name="price"
              placeholder="give an protable price"
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
          <div className="form-control md:w-1/2">
            <label className="label block">
              <span className="label-text text-xl font-medium">
                Added Date :
              </span>
            </label>
            <DatePicker
              dateFormat="dd/MM/YYYY"
              className=" border  w-full light:border-gray-500 bg-slate-200 p-3 text-xl rounded-lg"
              name="addDate"
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Jersey Status :</span>
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
          <button className="btn  text-white text-xl font-bold bg-cyan-800 rounded-xl p-2  ">
            Add Jersey
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddJersey;
