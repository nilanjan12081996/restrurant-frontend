import { Button, Label, Modal, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRestrurant } from "../../Reducer/RestrurantSlice";
import { toast } from "react-toastify";

const AddRestrurantModal=({
            addResModal,
          setAddResModal,
          tenantid
            })=>{

const dispatch=useDispatch()

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit=(data)=>{
    const payload = {
    tenant_id: tenantid, // auto from parent
    name: data.name,
    slug: data.slug,
    legal_name: data.legal_name
  };
  dispatch(addRestrurant(payload)).then((res)=>{
    if(res?.payload?.status_code===201){
        setAddResModal(false)
        toast.success(res?.payload?.message)
    }
  });

    
  }
    return(
        <>
        <Modal
        show={addResModal}
        onClose={() => setAddResModal(false)}
        >
        <form onSubmit={handleSubmit(onSubmit)}>
    <Modal.Header className="text-[#435971]">
      Add New Restaurant 
    </Modal.Header>

    <Modal.Body>
      <div className="space-y-4 h-[200px]">

        {/* Restaurant Name */}
        <div>
          <Label value="Restaurant Name *" />
          <TextInput
            type="text"
            placeholder="Enter Restaurant Name"
            {...register("name", { required: "Restaurant name is required" })}
          />
          {errors?.name && (
            <span className="text-red-500">{errors?.name?.message}</span>
          )}
        </div>

        {/* Slug */}
        <div>
          <Label value="Slug *" />
          <TextInput
            type="text"
            placeholder="Enter slug"
            {...register("slug", { required: "Slug is required" })}
          />
          {errors?.slug && (
            <span className="text-red-500">{errors?.slug?.message}</span>
          )}
        </div>

        {/* Legal Name */}
        <div>
          <Label value="Legal Name *" />
          <TextInput
            type="text"
            placeholder="Enter legal name"
            {...register("legal_name", { required: "Legal name is required" })}
          />
          {errors?.legal_name && (
            <span className="text-red-500">{errors?.legal_name?.message}</span>
          )}
        </div>

      </div>
    </Modal.Body>

    <Modal.Footer className="flex justify-end">

      <Button
        className="bg-white text-gray-700 border border-gray-300 hover:bg-[#9b1c1c] hover:text-white"
        onClick={() => setAddResModal(false)}
        type="button"
      >
        Cancel
      </Button>

      <Button type="submit" className="bg-[#686AF8] hover:bg-black">
        Add Restaurant
      </Button>

    </Modal.Footer>
  </form>
        </Modal>
        </>
    )
}
export default AddRestrurantModal