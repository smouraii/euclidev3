import React, { useState } from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import reqwest from "reqwest";
import FullScreenButton from "../../widgets/FullscreenButton";
import ModalAddFloder from "../../widgets/ModalAddFolder";
import ModalUpload from "../../widgets/ModalUpload";
import RefreshButton from "../../widgets/RefreshButton";
import Datatable from "../../widgets/DatatableFolderList";
import { Button, Icon, Input } from "antd";
import Highlighter from "react-highlight-words";

export default function FolderList() {
  const [selectedUser, setSelectedUser] = useState(null);
  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      data: {
        results: 30,
        ...params,
      },
    });
  };
  //Search Function for text Areas
  //   const getColumnSearchProps = (dataIndex) => ({
  //     filterDropdown: ({
  //       setSelectedKeys,
  //       selectedKeys,
  //       confirm,
  //       clearFilters,
  //     }) => (
  //       <div style={{ padding: 8 }}>
  //         {console.log(dataIndex)}
  //         <Input
  //           ref={(node) => {
  //             searchInput = node;
  //           }}
  //           placeholder={`Search ${dataIndex}`}
  //           value={selectedKeys[0]}
  //           onChange={(e) =>
  //             setSelectedKeys(e.target.value ? [e.target.value] : [])
  //           }
  //           onPressEnter={() =>
  //             handleSearch(selectedKeys, confirm, dataIndex.first)
  //           }
  //           style={{ width: 188, marginBottom: 8, display: "block" }}
  //         />
  //         <Button
  //           type="primary"
  //           onClick={() =>
  //             handleSearch(selectedKeys, confirm, dataIndex.first)
  //           }
  //           size="small"
  //           style={{ width: 90, marginRight: 8 }}
  //         >
  //           <Icon type="search" style={{ marginBottom: 10 }} />
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => handleReset(clearFilters)}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </Button>
  //       </div>
  //     ),
  //     filterIcon: (filtered) => (
  //       <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
  //     ),
  //     onFilter: (value, record) =>
  //       record[dataIndex]
  //         .toString()
  //         .toLowerCase()
  //         .includes(value.toLowerCase()),
  //     onFilterDropdownVisibleChange: (visible) => {
  //       if (visible) {
  //         setTimeout(() => searchInput.select());
  //       }
  //     },
  //     render: (text) =>
  //       state.searchedColumn === dataIndex ? (
  //         <Highlighter
  //           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //           searchWords={[state.searchText]}
  //           autoEscape
  //           textToHighlight={text.toString()}
  //         />
  //       ) : (
  //         text
  //       ),
  //   });
  //   const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //     confirm();
  //     setState({
  //       searchText: selectedKeys[0],
  //       searchedColumn: dataIndex,
  //     });
  //   };

  //   const handleReset = (clearFilters) => {
  //     clearFilters();
  //     setState({ searchText: "" });
  //   };

  //   const onShowSizeChange = (current, pageSizeOptions) => {
  //     setState({ pageSizeOptions });
  //     console.log(current, pageSizeOptions);
  //   };

  // const data =[]
  // const columns= [
  //   {
  //     title: "id",
  //     dataIndex:"id",
  //     key:"id",
  //     render: (id) => <a href="#" >{`${id.name}`}</a>,
  //     sorter: (a,b) => a.id.name - b.id.name,
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     sorter: (a, b) => a.name.localeCompare(b.name),
  //     width: "20%",
  //     ...getColumnSearchProps("name"),
  //   },
  //   {
  //     title: "age",
  //     dataIndex: "dob",
  //     key: "age",
  //     defaultSortOrder: "descend",
  //     //dob is date of birth from api
  //     render: (dob) => `${dob.age}`,
  //     //a b used to sort from big to small
  //     sorter: (a, b) => a.dob.age - b.dob.age,
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "dob",
  //     key: "date",
  //     defaultSortOrder: "descend",
  //     //dob is date of birth from api
  //     render: (dob) => `${dob.date}`,
  //     //a b used to sort from big to small
  //     sorter: (a, b) => a.dob.date - b.dob.date,
  //   },
  //   {
  //     title: "Gender",
  //     dataIndex: "gender",
  //     key: "gender",
  //     sorter: (a, b) => a.gender.length - b.gender.length,
  //     filters: [
  //       { text: "Male", value: "male" },
  //       { text: "Female", value: "female" },
  //     ],
  //     onFilter: (value, record) => record.gender.indexOf(value) === 0,
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email",
  //     sorter: (a, b) => a.email.localeCompare(b.email),
  //     ...getColumnSearchProps("email"),
  //   },
  //   {
  //     title: "Location",
  //     dataIndex: "location",
  //     key: "location",
  //     sorter: (a, b) => a.location.localeCompare(b.location),
  //     ...getColumnSearchProps("location"),
  //   },
  // ];

  //  const search = myInput.on( 'keyup', function () {
  //     Datatable.search( value ).draw();
  // } );
  // handleChange(event) {
  //   setState({value: event.target.value});
  // }

  return (
    <>
      <div className="d-flex justify-content-end">
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <RefreshButton />
            </PortletBody>
          </Portlet>
        </div>
      </div>

      <div className="row row-no-padding row-col-separator-x1">
        <div className="col-xl-12">
          <Portlet>
            <PortletBody fit={true}>
              <Datatable />
            </PortletBody>
          </Portlet>
        </div>
      </div>
    </>
  );
}
