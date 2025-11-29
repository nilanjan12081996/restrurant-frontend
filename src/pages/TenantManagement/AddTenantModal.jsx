import { Button, Label, Modal, Select, Textarea, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTenant, getTenantList } from "../../Reducer/TenantManagementSlice";

const AddTenantModal=({openAddMerchantModal,setOpenAddMerchantModal})=>{

    const dispatch=useDispatch()

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit=(data)=>{
dispatch(addTenant({create_default_role:true,...data})).then((res)=>{
    if(res?.payload?.status_code===201){
        setOpenAddMerchantModal(false)
        dispatch(getTenantList({
              page: 1, limit:10 
            }));
    }
})
  }
    return(
        <>
        <Modal
        show={openAddMerchantModal}
        onClose={() => setOpenAddMerchantModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header className="text-[#435971]">
          Add New Tenant
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4 h-[200px]">
            <div>
              <div className="mb-1 block">
                <Label value="Tenant Name *" />
              </div>
              <TextInput
                type="text"
                placeholder="Enter Tenant Name"
                {...register("name",{required:"Name is required"})}
              />
              {
                errors?.name&&(
                    <span className="text-red-500">{errors?.name?.message} </span>
                )
              }
            </div>
              <div>
              <div className="mb-1 block">
                <Label value="Slug *" />
              </div>
              <TextInput
                type="text"
                placeholder="Enter Slug"
                {...register("slug",{required:"Slug is required"})}
              />
              {
                errors?.name&&(
                    <span className="text-red-500">{errors?.name?.message} </span>
                )
              }
            </div>
           
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
            onClick={() => setOpenAddMerchantModal(false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-[#686AF8] hover:bg-black">
            Add Tenant
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
        </>
    )
}
export default AddTenantModal