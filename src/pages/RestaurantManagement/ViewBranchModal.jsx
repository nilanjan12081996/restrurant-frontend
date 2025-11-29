import { AgGridReact } from "ag-grid-react";
import { Modal, Button } from "flowbite-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ViewBranchModal = ({ viewBranch, setViewBranch, branchList }) => {
  const rows = branchList?.res?.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    start_time: JSON.parse(item.opening_hours_json).start_time,
    end_time: JSON.parse(item.opening_hours_json).end_time,
    address: item.address?.address_line1,
    city: item.address?.city,
  }));

  const columnDefs = [
    { field: "name", headerName: "Branch Name", sortable: true, filter: true },
    { field: "slug", headerName: "Slug", sortable: true },
    { field: "address", headerName: "Address" },
    { field: "city", headerName: "City" },
    { field: "start_time", headerName: "Start Time" },
    { field: "end_time", headerName: "End Time" },
  ];

  return (
    <>
      <Modal show={viewBranch} onClose={() => setViewBranch(false)} size="4xl">
        <Modal.Header className="text-[#435971]">View Branch</Modal.Header>

        <Modal.Body>
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

export default ViewBranchModal;
