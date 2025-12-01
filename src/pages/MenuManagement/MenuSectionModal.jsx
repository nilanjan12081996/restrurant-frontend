import { Modal, Button, Label, TextInput, FileInput, Select } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addMenuSection } from "../../Reducer/MenuSlice";

const MenuSectionModal = ({
  menuSectionModal,
  setMenuSectionModal,
  menuId,
}) => {
  const dispatch = useDispatch();

  const { allTenantList } = useSelector((state) => state.rest);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("menu_id", menuId);
    formData.append("tenant_id", data.tenant_id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("position", data.position);

    if (data.icon?.[0]) formData.append("icon", data.icon[0]);
    if (data.thumbnail?.[0]) formData.append("thumbnail", data.thumbnail[0]);
    if (data.banner?.[0]) formData.append("banner", data.banner[0]);

    dispatch(addMenuSection(formData)).then((res) => {
      if (res?.payload?.status_code === 201) {
      
        reset();
        setMenuSectionModal(false);
      }
    });
  };

  return (
    <Modal show={menuSectionModal} onClose={() => setMenuSectionModal(false)} size="md">
      <Modal.Header>Add Food Section</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Tenant Dropdown */}
          <div>
            <Label value="Tenant" />
            <Select {...register("tenant_id", { required: true })}>
              <option value="">Select tenant</option>
              {allTenantList?.data?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
            {errors.tenant_id && (
              <p className="text-red-600 text-sm">Tenant is required</p>
            )}
          </div>

          {/* Section Name */}
          <div>
            <Label>Section Name</Label>
            <TextInput
              {...register("name", { required: "Name is required" })}
              placeholder="e.g. Starters"
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <TextInput
              {...register("description", { required: "Description required" })}
              placeholder="Short description"
            />
          </div>

          {/* Position */}
          <div>
            <Label>Position</Label>
            <TextInput type="number" {...register("position", { required: true })} />
          </div>

          {/* Icon */}
          <div>
            <Label>Icon</Label>
            <FileInput {...register("icon")} />
          </div>

          {/* Thumbnail */}
          <div>
            <Label>Thumbnail</Label>
            <FileInput {...register("thumbnail")} />
          </div>

          {/* Banner */}
          <div>
            <Label>Banner</Label>
            <FileInput {...register("banner")} />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button color="light" onClick={() => setMenuSectionModal(false)}>
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

export default MenuSectionModal;
