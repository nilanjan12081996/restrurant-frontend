import { Button, Label, Modal, TextInput } from "flowbite-react"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { getTenantList, updateTenant } from "../../Reducer/TenantManagementSlice";

const UpdateTenantModal=({ openMerchantDetailsModal,
          setOpenMerchantDetailsModal,
          tenantid})=>{
    const{singleTenant}=useSelector((state)=>state?.tenant)
    const dispatch=useDispatch()

    console.log("singleTenant",singleTenant);

       const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();

      useEffect(()=>{
        setValue("name",singleTenant?.data?.name)
        setValue("slug",singleTenant?.data?.slug)
      },[setValue,singleTenant])
    
  const onSubmit = (formData) => {
  dispatch(
    updateTenant({
      id: tenantid,   // send tenant id
      data: formData  // send form values
    })
  ).then((res)=>{
    if(res?.payload?.status_code===200){
        setOpenMerchantDetailsModal(false)
        dispatch(getTenantList({page:1,limit:10}))
    }
  });
};

    return(
        <>
         <Modal
                show={openMerchantDetailsModal}
                onClose={() => setOpenMerchantDetailsModal(false)}
              >
                <form 
                onSubmit={handleSubmit(onSubmit)}
                >
                <Modal.Header className="text-[#435971]">
                  Update Tenant
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
                    onClick={() => setOpenMerchantDetailsModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#686AF8] hover:bg-black">
                   Update
                  </Button>
                </Modal.Footer>
                </form>
              </Modal>
        </>
    )
}
export default UpdateTenantModal