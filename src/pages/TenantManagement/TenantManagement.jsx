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
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSingleTenant, getTenantList } from "../../Reducer/TenantManagementSlice";
import AddTenantModal from "./AddTenantModal";
import AddRestrurantModal from "../RestaurantManagement/AddRestrurantModal";
import UpdateTenantModal from "./UpdateTenantModal";

const TenantManagement = () => {
  const { tenantList } = useSelector((state) => state.tenant);
  const dispatch = useDispatch();
  const [addResModal, setAddResModal] = useState(false);

  const [tenantid, setTenantId] = useState();
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    dispatch(
      getTenantList({
        page: page,
        limit,
      })
    );
  }, [page]);
  console.log(tenantList, "Cat List");
  const [openAddMerchantModal, setOpenAddMerchantModal] = useState(false);
  const [openMerchantDetailsModal, setOpenMerchantDetailsModal] =
    useState(false);
  const [openManageMerchantDetailsModal, setOpenManageMerchantDetailsModal] =
    useState(false);
  const navigate = useNavigate();
  const rowData = tenantList?.data || [];

  const columnDefs = [
    {
      field: "name",
      headerName: "TENANT NAME",
      sortable: true,
      filter: true,
    },
    {
      field: "slug",
      headerName: "SLUG",
      sortable: true,
      filter: true,
    },
    {
      field: "status",
      headerName: "STATUS",
      sortable: true,
      filter: true,
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      sortable: true,
      filter: true,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "-",
    },
    {
      headerName: "ACTIONS",
      field: "actions",
      minWidth: "500px",
      cellRenderer: (params) => (
        <Button
          onClick={() => handleMerchantDetails(params.data.id)}
          className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
        >
          Update
        </Button>
      ),
    },
    //   {
    //   headerName: "Restrurant",
    //   field: "restrurant",
    //   cellRenderer: (params) => (
    //     <Button
    //       onClick={() => handleRestrurant(params.data.id)}
    //       className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
    //     >
    //       Add New Restrurant
    //     </Button>
    //   ),
    // },
  ];

  const totalPages = tenantList?.meta?.pages || 1;

  const goToPrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleAddMerchant = () => {
    setOpenAddMerchantModal(true);
  };

  const handleMerchantDetails = (id) => {
    console.log("id",id);
    
    setOpenMerchantDetailsModal(true);
    setTenantId(id)
    dispatch(getSingleTenant({id}))
  };




  return (
    <div>
      <ToastContainer />
      <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
        <div className="h-full lg:h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Tenant List</h2>
            <Button
              onClick={() => handleAddMerchant()}
              className="bg-[#f9dffb] hover:bg-[#E7E7FF] px-4 py-1 text-[#d601e9] hover:text-[#536EFF] text-base font-semibold flex justify-center items-center rounded-md"
            >
              <CgAdd className="text-[18px] mr-1" />
              Add New Tentant
            </Button>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={false}
              paginationPageSize={10}
              domLayout="autoHeight"
            />
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={goToPrevious}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={goToNext}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Register New Merchant modal start here */}
      {openAddMerchantModal && (
        <AddTenantModal
          openAddMerchantModal={openAddMerchantModal}
          setOpenAddMerchantModal={setOpenAddMerchantModal}
        />
      )}
      {openMerchantDetailsModal && (
        <UpdateTenantModal
          openMerchantDetailsModal={openMerchantDetailsModal}
          setOpenMerchantDetailsModal={setOpenMerchantDetailsModal}
          tenantid={tenantid}
        />
      )}
    </div>
  );
};

export default TenantManagement;
