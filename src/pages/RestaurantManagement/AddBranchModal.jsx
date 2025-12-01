import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRestrurantBranh } from "../../Reducer/RestrurantSlice";
import { toast } from "react-toastify";

const AddBranchModal = ({
  openManageCustomerDetailsModal,
  setOpenManageCustomerDetailsModal,
  restaurantId,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      address_line1: "",
      address_line2: "",
      start_time: "",
      end_time: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      slug: "",
      latitude: "",
      longitude: "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      restaurant_id: restaurantId,
      name: data.name,
      address_line1: data.address_line1,
      address_line2: data.address_line2,
      opening_hours_json: {
        start_time: data.start_time,
        end_time: data.end_time,
      },
      is_open: 1,
      kitchen_status: "busy",
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country,
      slug: data.slug,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    dispatch(addRestrurantBranh(payload)).then((res) => {
      console.log("Res", res);
      if (res?.payload?.status_code === 201) {
        toast.success(res?.payload.message)
        setOpenManageCustomerDetailsModal(false);
      }
    });
  };

  return (
    <>
      <Modal
        show={openManageCustomerDetailsModal}
        onClose={() => setOpenManageCustomerDetailsModal(false)}
      >
        <Modal.Header className="text-[#435971]">Add Branch</Modal.Header>
        <Modal.Body>
          <form
            className="space-y-4 max-h-[500px] overflow-y-scroll"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Branch Name */}
            <div>
              <Label value="Branch Name" />
              <TextInput
                {...register("name", { required: true })}
                placeholder="Shiraz Bypass"
              />
              {errors.name && <p className="text-red-500 text-sm">Required</p>}
            </div>

            {/* Address */}
            <div>
              <Label value="Address Line 1" />
              <TextInput
                {...register("address_line1", { required: true })}
                placeholder="Bypass Road"
              />
              {errors.address_line1 && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <Label value="Address Line 2" />
              <TextInput
                {...register("address_line2")}
                placeholder="Near Market"
              />
            </div>

            {/* Opening hours */}
            <div className="flex gap-4">
              <div className="w-full">
                <Label value="Start Time" />
                <TextInput
                  {...register("start_time", { required: true })}
                  placeholder="08:00"
                />
                {errors.start_time && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div className="w-full">
                <Label value="End Time" />
                <TextInput
                  {...register("end_time", { required: true })}
                  placeholder="22:30"
                />
                {errors.end_time && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
            </div>

            {/* City, State, Postal, Country */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label value="City" />
                <TextInput {...register("city", { required: true })} />
                {errors.city && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
              <div>
                <Label value="State" />
                <TextInput {...register("state")} />
              </div>
              <div>
                <Label value="Postal Code" />
                <TextInput {...register("postal_code", { required: true })} />
                {errors.postal_code && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
              <div>
                <Label value="Country" />
                <TextInput {...register("country", { required: true })} />
                {errors.country && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
            </div>

            {/* Slug, Latitude, Longitude */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label value="Slug" />
                <TextInput {...register("slug", { required: true })} />
                {errors.slug && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
              <div>
                <Label value="Latitude" />
                <TextInput {...register("latitude")} />
              </div>
              <div>
                <Label value="Longitude" />
                <TextInput {...register("longitude")} />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                className="bg-gray-300 text-black"
                onClick={() => setOpenManageCustomerDetailsModal(false)}
                type="button"
              >
                Cancel
              </Button>

              <Button className="bg-[#686AF8] text-white" type="submit">
                Save Branch
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddBranchModal;
