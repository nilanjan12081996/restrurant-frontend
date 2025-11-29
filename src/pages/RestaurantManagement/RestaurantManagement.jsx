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
import { getRestrurant } from "../../Reducer/RestrurantSlice";
import AddBranchModal from "./AddBranchModal";

const RestaurantManagement = () => {
  const { res, loading } = useSelector((state) => state.rest);
  const[addresModal,setAddResmodal]=useState(false)
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
  { field: "name", headerName: "Restaurant Name", sortable: true, filter: true },
  { field: "legal_name", headerName: "Legal Name", sortable: true, filter: true },
  { field: "status", headerName: "Status", sortable: true, filter: true },
  { field: "rating_avg", headerName: "Rating Avg", sortable: true, filter: true },
  { field: "created_at", headerName: "Created At", sortable: true, filter: true },
  {
    headerName: "Tenant Name",
    valueGetter: (params) => params.data?.tenant?.name,
  },
  {
    headerName: "Actions",
    field: "actions",
    cellRenderer: () => (
      <Button className="bg-blue-500" onClick={() => handleCustomerDetails()}>
        View Details
      </Button>
    ),
  },
   {
    headerName: "Branch",
    field: "branch",
    cellRenderer: (params) => (
      <Button className="bg-blue-500" onClick={() => handleManageCustomerDetails(params.data.id)}>
        Add Branch
      </Button>
    ),
  }
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

  return (
    <div>
      <ToastContainer />
      <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
        <div className="h-full lg:h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Restrurant List</h2>
                 {/* <Button
                  onClick={() => handleRest()}
                  className="bg-[#536EFF] hover:bg-[#E7E7FF] px-4 py-1 text-white hover:text-[#536EFF] text-base font-semibold flex justify-center items-center rounded-md"
                >
                  <CgAdd className="text-[18px] mr-1" />
                  Add New Restrurant
                </Button> */}
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
      {/* Customer Details modal start here */}
      {/* <Modal
        show={openCustomerDetailsModal}
        onClose={() => setOpenCustomerDetailsModal(false)}
      >
        <Modal.Header className="text-[#435971]">Customer Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 h-[500px] overflow-y-scroll">
            <h3 className="text-base text-[#191919] font-bold mb-1">Details</h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Customer Name
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                Erik Sarkar
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Email Id
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                ErikSarkar@gmail.com
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Phone Number
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                +91 90885 67890
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Last Login Date
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                03 Jul 2025
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Last Login Time
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                6:12 PM
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Total Orders
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                12
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Redemptions
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                10
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Referrals Made
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                2
              </div>
            </div>
            <h3 className="text-base text-[#191919] font-bold mb-1">
              Wallets Balance
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Current Balance
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                ₹ 20000
              </div>
            </div>
            <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
              <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
                Wallet Transaction History
              </h3>
              <div className="overflow-x-auto">
                <Table striped>
                  <TableHead>
                    <TableHeadCell className="font-semibild">
                      Date
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Type
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      ₹ 500
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Reason
                    </TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#05923C]">
                        Credit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Refund
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#05923C]">
                        Credit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Refund
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#05923C]">
                        Credit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Refund
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#F55D43]">
                        Debit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Withdrawal
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#F55D43]">
                        Debit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Withdrawal
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <h3 className="text-base text-[#191919] font-bold mb-1">
              Points History
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Total Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                750 pts
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Valid Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                650 pts
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Expired Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                100 pts
              </div>
            </div>
            <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
              <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
                Source & Expiry
              </h3>
              <div className="overflow-x-auto">
                <Table striped>
                  <TableHead>
                    <TableHeadCell className="font-semibild">
                      Source
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Points
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Earned on
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Expiry Date
                    </TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        Signup Bonus
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">100</TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        01 Jul 2025
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        31 Aug 2025
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        Order Reward
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">300</TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        01 Jul 2025
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        31 Aug 2025
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        Referral
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">250</TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        01 Jul 2025
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        31 Aug 2025
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
            onClick={() => setOpenCustomerDetailsModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleManageCustomerDetails}
            className="bg-[#686AF8] hover:bg-black"
          >
            Manage Merchant
          </Button>
        </Modal.Footer>
      </Modal> */}
      {/* Customer Details modal ends here */}
      {/* Manage Customer Details modal start here */}
        {
          openManageCustomerDetailsModal&&(
            <AddBranchModal
            openManageCustomerDetailsModal={openManageCustomerDetailsModal}
            setOpenManageCustomerDetailsModal={setOpenManageCustomerDetailsModal}
             restaurantId={selectedRestaurantId}
            />
          )
        }
      {/* Manage Customer Details modal ends here */}
    </div>
  );
};

export default RestaurantManagement;
