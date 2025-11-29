import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Label,
  Select,
  Textarea,
  FileInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgAdd } from "react-icons/cg";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getRestrurant,
  getTenantListAll,
  restrurantBranchList,
} from "../../Reducer/RestrurantSlice";
import AddBranchModal from "./AddBranchModal";
import ViewBranchModal from "./ViewBranchModal";
import AddRestrurantModal from "./AddRestrurantModal";

const RestaurantManagement = () => {
  const { res, loading, branchList } = useSelector((state) => state.rest);
  const [viewBranch, setViewBranch] = useState(false);
  const [restruId, setRestruId] = useState();
  const [addresModal, setAddResmodal] = useState(false);
  const [addResModal, setAddResModal] = useState(false);
  const [openCustomerDetailsModal, setOpenCustomerDetailsModal] =
    useState(false);
  const [openManageCustomerDetailsModal, setOpenManageCustomerDetailsModal] =
    useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestrurant());
  }, [dispatch]);

  const rowData = res?.res || [];

  const columnDefs = [
    // { field: "id", headerName: "ID", sortable: true, filter: true },
    {
      field: "name",
      headerName: "Restaurant Name",
      sortable: true,
      filter: true,
    },
    {
      field: "legal_name",
      headerName: "Legal Name",
      sortable: true,
      filter: true,
    },
    { field: "status", headerName: "Status", sortable: true, filter: true },
    {
      field: "rating_avg",
      headerName: "Rating Avg",
      sortable: true,
      filter: true,
    },
    {
      field: "created_at",
      headerName: "Created At",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Tenant Name",
      valueGetter: (params) => params.data?.tenant?.name,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: () => (
        <Button className="bg-blue-500" onClick={() => handleCustomerDetails()}>
          Update
        </Button>
      ),
    },
    {
      headerName: "Add Branch",
      field: "branch",
      cellRenderer: (params) => (
        <Button
          className="bg-blue-500"
          onClick={() => handleManageCustomerDetails(params.data.id)}
        >
          Add Branch
        </Button>
      ),
    },
    {
      headerName: "View Branch Details",
      field: "branch",
      cellRenderer: (params) => (
        <Button
          className="bg-blue-500"
          onClick={() => handleviewBranch(params.data.id)}
        >
          View Branch Details
        </Button>
      ),
    },
  ];

  const handleCustomerDetails = () => {
    setOpenCustomerDetailsModal(true);
  };

  const handleManageCustomerDetails = (id) => {
    setSelectedRestaurantId(id);
    setOpenManageCustomerDetailsModal(true);
    // setOpenCustomerDetailsModal(false);
  };

  // const handleRest=()=>{
  //   setAddResmodal(true)
  // }
  const handleviewBranch = (id) => {
    setRestruId(id);
    setViewBranch(true);
    dispatch(restrurantBranchList({ id: id }));
  };

  const handleRestrurant = () => {
    dispatch(getTenantListAll());
    setAddResModal(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
        <div className="h-full lg:h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Restrurant List</h2>
            <Button
              onClick={() => handleRestrurant()}
              className="bg-[#f9dffb] hover:bg-[#E7E7FF] px-4 py-1 text-[#d601e9] hover:text-[#536EFF] text-base font-semibold flex justify-center items-center rounded-md"
            >
              <CgAdd className="text-[18px] mr-1" />
              Add New Restrurant
            </Button>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
            />
          </div>
        </div>
      </div>
      {openManageCustomerDetailsModal && (
        <AddBranchModal
          openManageCustomerDetailsModal={openManageCustomerDetailsModal}
          setOpenManageCustomerDetailsModal={setOpenManageCustomerDetailsModal}
          restaurantId={selectedRestaurantId}
        />
      )}
      {viewBranch && (
        <ViewBranchModal
          viewBranch={viewBranch}
          setViewBranch={setViewBranch}
          branchList={branchList}
        />
      )}
      {/* Manage Customer Details modal ends here */}
      {addResModal && (
        <AddRestrurantModal
          addResModal={addResModal}
          setAddResModal={setAddResModal}
        />
      )}
    </div>
  );
};

export default RestaurantManagement;
