import { Modal, Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMenu, getMenu } from "../../Reducer/MenuSlice"; // YOUR API
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddMenuModal = ({ addMenuModal, setAddMenuModal, restruId }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      active_from: "",
      active_to: "",
      status: true,
    },
  });

  // Convert status (true/false) to "active"/"inactive"
  const statusValue = watch("status") ? "active" : "inactive";

  const onSubmit = (data) => {
    const payload = {
      restaurant_id: restruId,
      name: data.name,
      active_from: new Date(data.active_from).toISOString(),
      active_to: new Date(data.active_to).toISOString(),
      status: statusValue,
    };

    dispatch(addMenu(payload)).then((res) => {
        console.log("Res",res);
        
      if (res?.payload?.status_code === 201) {
        console.log("restruId",restruId);
        
         dispatch(getMenu({id:restruId}))
        setAddMenuModal(false);
        
       
      }
      else if(res?.error?.message==="Rejected"){
        toast.error(res?.payload?.message
)
      }
    });
  };

  return (
    <Modal show={addMenuModal} onClose={() => setAddMenuModal(false)} size="md">
      <Modal.Header>Add New Menu</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Menu Name */}
          <div>
            <Label value="Menu Name" />
            <TextInput
              {...register("name", { required: "Menu name is required" })}
              placeholder="Enter Menu Name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Active From */}
          <div>
            <Label value="Active From (Date & Time)" />
            <TextInput
              type="datetime-local"
              {...register("active_from", { required: "Required" })}
            />
            {errors.active_from && (
              <p className="text-red-600 text-sm">{errors.active_from.message}</p>
            )}
          </div>

          {/* Active To */}
          <div>
            <Label value="Active To (Date & Time)" />
            <TextInput
              type="datetime-local"
              {...register("active_to", { required: "Required" })}
            />
            {errors.active_to && (
              <p className="text-red-600 text-sm">{errors.active_to.message}</p>
            )}
          </div>

          {/* Status Toggle */}
          <div>
            <Label value="Status" />
            <ToggleSwitch
              checked={watch("status")}
              label={watch("status") ? "Active" : "Inactive"}
              onChange={(value) => {
                // update status manually
                reset({
                  ...watch(),
                  status: value,
                });
              }}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button color="light" onClick={() => setAddMenuModal(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMenuModal;
