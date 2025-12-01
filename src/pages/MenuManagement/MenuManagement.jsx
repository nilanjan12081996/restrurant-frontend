import { AgGridReact } from "ag-grid-react";
import { Button, Modal } from "flowbite-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";

const MenuManagement = ({ menuModal, setMenumodal, menus,setAddMenuModal,
          setRestruId, setMenuSectionModal ,setMenuId,handleAddMenuSection}) => {
  
  // Convert API response to AG Grid rows
  const navigate=useNavigate()
  const rows = menus?.data?.map((item) => ({
    id: item.id,
    name: item.name,
    restaurant_id: item.restaurant_id,
    active_from: new Date(item.active_from).toLocaleDateString(),
    active_to: new Date(item.active_to).toLocaleDateString(),
    status: item.status,
  }));

  // Define table columns
  const columnDefs = [
    { field: "name", headerName: "Menu Name", sortable: true, filter: true },
  
    { field: "active_from", headerName: "Active From" },
    { field: "active_to", headerName: "Active To" },
    { field: "status", headerName: "Status" },
       {
          headerName: "Menu Section",
          field: "menu_section",
          cellRenderer: (params) => (
            <Button
              className="bg-blue-500"
              onClick={() => handleAddMenuSection(params.data.id)}
            >
              Add Menu section
            </Button>
          ),
        },
        {
          headerName: "View Menu Section",
          field: "menu_section",
          cellRenderer: (params) => (
            <Button
              className="bg-blue-500"
              onClick={() => handleviewMenuSection(params.data.id)}
            >
              View Menu section 
            </Button>
          ),
        },
  ];
const addMenuHandler=()=>{

setAddMenuModal(true)
}

const handleviewMenuSection=(id)=>{
  navigate("/menusection-list",{state:{
    id:id
  }})
}
  return (
    <>
      <Modal show={menuModal} onClose={() => setMenumodal(false)} size="4xl">
        <Modal.Header className="text-[#435971]">Menu Management</Modal.Header>

        <Modal.Body>
             <div className="flex justify-end mb-4">
          <Button color="blue" onClick={addMenuHandler}>
            + Add Menu
          </Button>
        </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              rowData={rows}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MenuManagement;
