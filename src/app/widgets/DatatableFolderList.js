import React, { useState } from "react";
import { Table, Input, Button, Icon, DatePicker } from "antd";
import reqwest from "reqwest";
import { withRouter } from "react-router-dom";
import QueryBuilder from "./QueryBuilder";
import Highlighter from "react-highlight-words";
import {
  PortletBody,
  Portlet,
  PortletHeader,
} from "../partials/content/Portlet";
import ModalAttachementList from "./ModalAttachement";
import redaxios from "redaxios";


export default function Datatable () {
  const [columnsApi, setColumnsApi] = useState([]);
  const [columnsData, setColumsData] = useState(null);
  const [data, setData] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [pagination,setPagination]= useState({})
  const [loading,setLoading]=useState(false);
  const [searchText,setSearchText]=useState("");
  const [searchedColumn,setSearchColumn]=useState("");
  const [userInfo,setUserInfo]=useState(null);

  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/86b418dc-085b-415d-8c2d-bee469ac5b82")
      .then((res) => setColumsData(res.data));
  }, []);

  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/0c67f526-ea93-4e06-b4e4-71f4da3c5917")
      .then((res) => setData(res.data));
  }, []);



  React.useEffect(() => {
    if (!userInfo) return;
    console.log(userInfo,"userinfo");
  }, [userInfo]);

 const handleChangeId = (val) => {
    setUserInfo(val);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination(pager);
  };

  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/86b418dc-085b-415d-8c2d-bee469ac5b82")
      .then((res) => setColumsData(res.data));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    redaxios
      .get("https://run.mocky.io/v3/0c67f526-ea93-4e06-b4e4-71f4da3c5917")
      .then((res) => setData(res.data));
  }, []);

  
  //Search Function for text Areas
//  const getColumnSearchProps = (dataIndex) => ({
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
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text.toString()}
//         />
//       ) : (
//         text
//       ),
//   });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
};

 const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  //SearchFunction For Date
  // const getColumnSearchPropsDate = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //     autoFocus,
  //     handleChange,
  //     placeholder,
  //     value,
  //     format,
  //     handleSearch,
  //     handleClear,
  //   }) => (
  //     <div style={{ padding: 8 }}>
  //       <DatePicker.RangePicker
  //         autoFocus={autoFocus}
  //         onChange={handleChange}
  //         placeholder={placeholder}
  //         value={value}
  //         format={format}
  //         style={{ marginBottom: 8 }}
  //       />
  //       <Button
  //         type="primary"
  //         role="search"
  //         onClick={handleSearch}
  //         style={{ width: 90 }}
  //         size="small"
  //       >
  //         search
  //       </Button>
  //       <Button
  //         role="reset"
  //         style={{ width: 90 }}
  //         onClick={handleClear}
  //         size="small"
  //       >
  //         reset
  //       </Button>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase()),
  //   onFilterDropdownVisibleChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.select());
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text.toString()}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  React.useEffect(() => {
    if (!data) return;
    const mapData = data.data.map((datarow) => ({
      createdt: datarow.createdt,
      moddt: datarow.moddt,
      por_addressid: datarow.por_addressid,
      por_addresstype: datarow.por_addresstype,
      requestclass: datarow.requestclass,
      requestdesc: datarow.requestdesc,
      requeststatus: datarow.requeststatus,
      requesttext: datarow.requesttext,
      s_requestid: datarow.s_requestid,
      templateflag: datarow.templateflag,
      
    }));
    setDataSource(mapData);
  }, [data]);

  React.useEffect(() => {
    if (!columnsData) return;
    const mapColumns = columnsData.columns.map((column) => ({
      title: column.title,
      dataIndex: column.data,
      key: column.name,
      // ...getColumnSearchProps(column.data),
     
      // sorter: (a, b) => a.column.data.value - b.column.data.value,
      // sorter: (a, b) => a.addresstype.localeCompare(b.addresstype)
    }));
    setColumnsApi(mapColumns);
    console.log("mapColumns", mapColumns);
  }, [columnsData]);

  // render() {
    // if (userInfo === null) {
    //   const columns = [
    //     {
    //       title: "Id",
    //       dataIndex: "id",
    //       key: "id",
    //       render: (id, val) => (
    //         <Button
    //           type="link"
    //           onClick={() => handleChangeId(val)}
    //         >{`${id.value}`}</Button>
    //       ),
    //       sorter: (a, b) => a.id.value - b.id.value,
    //     },
    //     {
    //       title: "Request id",
    //       dataIndex: "s_requestid",
    //       key: "s_requestid",
    //       sorter: (a, b) => a.s_requestid.localeCompare(b.s_requestid),
    //       width: "20%",
    //       ...getColumnSearchProps("s_requestid"),
    //     },
    //     {
    //       title: "Creation Date",
    //       dataIndex: "createdt",
    //       key: "createdt",
    //       defaultSortOrder: "descend",
    //       //dob is date of birth from api
    //       //a b used to sort from big to small
    //       sorter: (a, b) => a.createdt - b.createdt,
    //       ...getColumnSearchPropsDate("createdt"),
    //     },
    //     {
    //       title: "Request status",
    //       dataIndex: "requeststatus",
    //       key: "requeststatus",
    //       sorter: (a, b) => a.requeststatus.length - b.requeststatus.length,
    //       filters: [
    //         { text: "Draft", value: "draft" },
    //         { text: "Open", value: "open" },
    //       ],
    //       onFilter: (value, record) => record.requeststatus.indexOf(value) === 0,
    //     },
    //     {
    //       title: "Request description",
    //       dataIndex: "requestdesc",
    //       key: "requestdesc",
    //       defaultSortOrder: "descend",
    //       //dob is date of birth from api
    //       //a b used to sort from big to small
    //       sorter: (a, b) => a.requestdesc - b.requestdesc,
    //       ...getColumnSearchProps("requestdesc"),
    //     },
    //     {
    //       title: "Address description",
    //       dataIndex: "addressdesc",
    //       key: "addressdesc",
    //       sorter: (a, b) => a.addressdesc.localeCompare(b.addressdesc),
    //       ...getColumnSearchProps("addressdesc"),
    //     },
    //     {
    //       title: "Address Type",
    //       dataIndex: "addresstype",
    //       key: "addresstype",
    //       sorter: (a, b) => a.addresstype.localeCompare(b.addresstype),
    //       ...getColumnSearchProps("addresstype"),
    //     },
    //     {
    //       title: "Attachment",
    //       dataIndex: "attachment",
    //       key: "attachment",
    //       render: (id, val) => (
    //         <ModalAttachementList/>
    //       ),
    //       sorter: (a, b) => a.id.value - b.id.value,
    //     }
    //   ];

      return (
        <>
              <QueryBuilder data={data} />
          <Table
            style={{ backgroundColor: "white" }}
            columns={columnsApi}
            dataSource={dataSource}
          />

          {console.log(this)}
        </>
      );
    // } else {
    //   const data = [];
    //   const columns1 = [
    //     {
    //       title: "Id",
    //       dataIndex: "id",
    //       key: "id",
    //       render: (id) => `${id.value}`,
    //       sorter: (a, b) => a.id.value - b.id.value,
    //     },
    //     {
    //       title: "s_Request id",
    //       dataIndex: "s_requestid",
    //       key: "s_requestid",
    //       sorter: (a, b) => a.s_requestid.localeCompare(b.s_requestid),
    //       width: "20%",
    //       ...getColumnSearchProps("s_requestid"),
    //     },
    //     {
    //       title: "Created date",
    //       dataIndex: "createdt",
    //       key: "createdt",
    //       defaultSortOrder: "descend",
    //       //a b used to sort from big to small
    //       sorter: (a, b) => a.createdt - b.createdt,
    //     },
    //     {
    //       title: "Request status",
    //       dataIndex: "requeststatus",
    //       key: "requeststatus",
    //     },
    //     {
    //       title: "Request Description",
    //       dataIndex: "requestdesc",
    //       key: "requestdesc",
    //       ...getColumnSearchProps("requestdesc"),
    //     },
    //     {
    //       title: "Address desc",
    //       dataIndex: "addressdesc",
    //       key: "addressdesc",
    //       ...getColumnSearchProps("addressdesc"),
    //     },
    //   ];
    //   const columns2 = [
    //     {
    //       title: "Sample",
    //       dataIndex: "sample",
    //       key: "sample",
    //       sorter: (a, b) => a.sample.localeCompare(b.sample),
    //       width: "20%",
    //       ...getColumnSearchProps("sample"),
    //     },
    //     {
    //       title: "Description",
    //       dataIndex: "description",
    //       key: "description",
    //       sorter: (a, b) => a.description.localeCompare(b.description),
    //     },
    //     {
    //       title: "Status",
    //       dataIndex: "status",
    //       key: "	status",
    //       sorter: (a, b) => a.status.localeCompare(b.status),
    //       ...getColumnSearchProps("	status"),
    //     },
    //     {
    //       title: "Request ID Evo",
    //       dataIndex: "requestidevo",
    //       key: "	requestidevo",
    //       sorter: (a, b) => a.requestidevo.localeCompare(b.requestidevo),
    //       ...getColumnSearchProps("	requestidevo"),
    //     },
    //   ];
    //   const columns3 = [
    //     {
    //       title: "Sample",
    //       dataIndex: "sample",
    //       key: "sample",
    //       render: (sample) => `${sample.value}`,
    //       sorter: (a, b) => a.sample.value - b.sample.value,
    //     },
    //     {
    //       title: "Test",
    //       dataIndex: "test",
    //       key: "test",
    //       sorter: (a, b) => a.test.localeCompare(b.test),
    //     },
    //   ];

    //   return (
    //     <>
    //       <div className="row row-no-padding row-col-separator-x1">
    //         <div className="col-xl-12">
    //           <Portlet>
    //             <PortletBody fit={true}>
    //               <PortletHeader title="Details" />
    //               <Table
    //                 style={{ backgroundColor: "white", padding: 20 }}
    //                 columns={columns1}
    //                 rowKey={(record) => record.login.uuid}
    //                 dataSource={[userInfo]}
    //                 // pagination={pagination}
    //                 loading={loading}
    //                 onChange={handleTableChange}
    //               />
    //             </PortletBody>
    //           </Portlet>
    //           <Portlet>
    //             <PortletBody fit={true}>
    //               <PortletHeader title="Sample" />
    //               <Table
    //                 style={{ backgroundColor: "white" }}
    //                 columns={columns2}
    //                 rowKey={(record) => record.login.uuid}
    //                 dataSource={[userInfo]}
    //                 // pagination={pagination}
    //                 loading={loading}
    //                 onChange={handleTableChange}
    //               />
    //             </PortletBody>
    //           </Portlet>
    //           <Portlet>
    //             <PortletBody fit={true}>
    //             <PortletHeader title="Results" />
    //               <Table
    //                 style={{ backgroundColor: "white" }}
    //                 columns={columns3}
    //                 rowKey={(record) => record.login.uuid}
    //                 dataSource={[userInfo]}
    //                 // pagination={pagination}
    //                 loading={loading}
    //                 onChange={handleTableChange}
    //               />
    //             </PortletBody>

    //             {console.log(this)}
    //           </Portlet>
            // </div>
          // </div>
        // </>
      // );
    // }
  // }
}
