import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editRestrurant, getRestrurant, updateRestrurant } from "../../Reducer/RestrurantSlice";

const UpdateRestrurantModal = ({
  openCustomerDetailsModal,
  setOpenCustomerDetailsModal,
  restruId,
}) => {
  const { allTenantList, editRest } = useSelector((state) => state.rest);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch single restaurant details
  useEffect(() => {
    if (restruId) {
      dispatch(editRestrurant({ restaurant_id: restruId }));
    }
  }, [restruId]);

  // Set the values when API response arrives
  useEffect(() => {
    if (editRest?.res) {
      reset({
        name: editRest.res.name,
        slug: editRest.res.slug,
        legal_name: editRest.res.legal_name,
        tenant_id: editRest.res.tenant_id,
      });
    }
  }, [editRest, reset]);
const onSubmit=(data)=>{
    dispatch(updateRestrurant({...data,restaurant_id:restruId})).then((res)=>{
        if(res?.payload?.status_code===200){
            setOpenCustomerDetailsModal(false)
            dispatch(getRestrurant())
        }
    })
}


  return (
    <>
      <Modal
        show={openCustomerDetailsModal}
        onClose={() => setOpenCustomerDetailsModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="text-[#435971]">
            Update Restaurant
          </Modal.Header>

          <Modal.Body>
            <div className="space-y-3">
              {/* Restaurant Name */}
              <div>
                <Label value="Restaurant Name *" />
                <TextInput
                  type="text"
                  {...register("name", { required: "Restaurant name is required" })}
                />
                {errors?.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

              {/* Tenant */}
              <div>
                <Label value="Select Tenant" />
                <Select {...register("tenant_id", { required: true })}>
                  <option value="">Select Tenant</option>
                  {allTenantList?.data?.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
                {errors?.tenant_id && (
                  <span className="text-red-500">Tenant is required</span>
                )}
              </div>

              {/* Slug */}
              <div>
                <Label value="Slug *" />
                <TextInput
                  type="text"
                  {...register("slug", { required: "Slug is required" })}
                />
                {errors?.slug && (
                  <span className="text-red-500">{errors.slug.message}</span>
                )}
              </div>

              {/* Legal Name */}
              <div>
                <Label value="Legal Name *" />
                <TextInput
                  type="text"
                  {...register("legal_name", {
                    required: "Legal name is required",
                  })}
                />
                {errors?.legal_name && (
                  <span className="text-red-500">{errors.legal_name.message}</span>
                )}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="flex justify-end">
            <Button
              type="button"
              className="bg-white text-gray-700 border border-gray-300"
              onClick={() => setOpenCustomerDetailsModal(false)}
            >
              Cancel
            </Button>

            <Button type="submit" className="bg-[#686AF8] hover:bg-black">
              Update Restaurant
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default UpdateRestrurantModal;
