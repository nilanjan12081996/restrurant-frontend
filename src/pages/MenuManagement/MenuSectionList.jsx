import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getMenuSection } from "../../Reducer/MenuSlice";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "flowbite-react";

const MenuSectionList = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { allMenuSection, loading } = useSelector((state) => state.menu);

  const menuId = location?.state?.id;

  useEffect(() => {
    if (menuId) {
      dispatch(getMenuSection({ id: menuId }));
    }
  }, [menuId, dispatch]);

  // Prepare AG Grid rows
  const rows =
    allMenuSection?.data?.sections?.map((sec) => ({
      id: sec.id,
      name: sec.name,           // Starter, Main Course, etc.
      description: sec.description,
      status: sec.status,
    })) || [];

  // Columns
  const columnDefs = [
    { field: "name", headerName: "Menu Section Name", sortable: true, filter: true },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "status", headerName: "Status", sortable: true },

    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <Button
          size="xs"
          color="blue"
          onClick={() => alert(`Edit section ${params.data.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Show Menu Name */}
      <h1 className="text-2xl font-bold text-blue-600 mb-2">
        Menu: {allMenuSection?.data?.name}
      </h1>

      <p className="text-gray-600 mb-5">
        These are the sections under <b>{allMenuSection?.data?.name}</b>.
      </p>

      {loading && <p>Loading...</p>}

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rows}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default MenuSectionList;
