import React, { useRef, useState } from "react";
import { Table, Input, Button, Icon, DatePicker } from "antd";
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
import queryString from "query-string";
import PageDetails from "./PageDetails";

function Datatable(props) {
  //parsed
  const [parsed, setParsed] = useState(
    queryString.parse(props.location.search)
  );
  //main Table
  const [columnsApi, setColumnsApi] = useState([]);
  const [columnsData, setColumsData] = useState(null);
  const [data, setData] = useState({data:[]});
  const [dataSource, setDataSource] = useState(null);

  //Table's functionality
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  //data of the row
  const [selectedRow, setSelectedRow] = useState(null);

  const [columnsId,setColumnsId] = useState(null);



  //id of table
  const [idTable, setIdTable] = useState(null);

  // API for Columns generation
  React.useEffect(() => {
    redaxios
      .get(
        `http://localhost:8080/EuclideV2/api/getPageList?pagelistid=${parsed.pagelistid}&fluxId=${parsed.fluxId}`,
        { withCredentials: true }
      )
      .then((res) => setColumsData(res.data));
    console.log("parsed", parsed);
    console.log("props", props);
    console.log("columnsData", columnsData);

    //API for Data in Datatable
  }, [parsed]);

  React.useEffect(() => {
    if (columnsData !== null)
      redaxios
        .get(
          `http://localhost:8080/EuclideV2/api/getList?dc=com.euclide.sdc.${columnsData.sdcid}&masterdata=${columnsData.sdcid}&attachments=${columnsData.attachment}`,
          { withCredentials: true }
        )
        .then((res) => setData(res.data));
  }, [columnsData]);
  console.log("Alldata", data);

  React.useEffect(() => {
    if (!selectedRow) return;
    console.log("selectedRow", selectedRow);
  }, [selectedRow]);

  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination(pager);
  };

  const searchInput = useRef(null);

  //Search Function for text Areas
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex.first)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex.first)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          <Icon type="search" style={{ marginBottom: 10 }} />
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
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
  //       setTimeout(() => searchInput.current.select());
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

  //Attachement Column

  const columnAttachement = [
    {
      title: "Attachement",
      dataIndex: "test",
      key: "test",
      render: (id, val) => (
       
        <ModalAttachementList 
        recordId={[val.attachments]} />
      ),
    },
  ];

  //map data in columns
  // React.useEffect(() => {
  //   if (!data) return;
  //   const mapData = data.data.map((datarow) => ({
  //     id: datarow.id,
  //     createdt: datarow.createdt != null ? datarow.createdt : "N/A",
  //     moddt: datarow.moddt != null ? datarow.moddt : "N/A",
  //     por_addressid: datarow.por_addressid != null ? datarow.por_addressid : "N/A",
  //     por_addresstype: datarow.por_addresstype != null ? datarow.por_addresstype : "N/A",
  //     requestclass: datarow.requestclass != null ? datarow.requestclass : "N/A",
  //     requestdesc: datarow.requestdesc != null ? datarow.requestdesc : "N/A",
  //     requeststatus: datarow.requeststatus != null ? datarow.requeststatus : "N/A",
  //     requesttext: datarow.requesttext != null ? datarow.requesttext : "N/A",
  //     s_requestid: datarow.s_requestid != null ? datarow.s_requestid : "N/A",
  //     templateflag: datarow.templateflag != null ? datarow.templateflag : "N/A",
  //     attachments: datarow.attachments,
  //   }));
  //   setDataSource(mapData);
  //   console.log("mapData", mapData);
  // }, [data]);

  React.useEffect(() => {}, []);

  //map columns for generating columns and search and sort and redirect to details
  React.useEffect(() => {
    if (!columnsData) return;
    const mapColumns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        render: (id, val) => (
          <Button type="link" onClick={() => setSelectedRow(val)}>
            {id}
          </Button>
        ),
      },
      ...columnsData.columns.map((column, index) => ({
        title: column.title,
        dataIndex: column.data,
        key: column.name,
        ...getColumnSearchProps(column.data),
        sorter: (a, b) =>{
          console.log("a1",a,"b1",b);
        console.log("a",a[column.data],"b",b[column.data]);
        return a[column.data] !== null
            ? a[column.data].localeCompare(b[column.data])
            : a[column.data] - b[column.data] 
        },
            render:(data)=>(data!=null ?data:"N/A"),
      })),
    ];
    setColumnsApi(mapColumns);
    console.log("selectedRow", selectedRow);
    console.log("mapColumns", mapColumns);
  }, [columnsData, selectedRow]);

  React.useEffect(() => {
    console.log("columnsApi", columnsApi);
  }, [columnsApi]);

  return (
    <>
      <QueryBuilder columnsData={columnsData} />
      {!selectedRow && (
        <Table
          style={{ backgroundColor: "white" }}
          columns={[...columnsApi, ...columnAttachement]}
          dataSource={data.data}
        />
      )}
      {selectedRow && (
        <div className="row row-no-padding row-col-separator-x1">
          <div className="col-xl-12">
            <Portlet>
              <PortletBody fit={true}>
                <PortletHeader title="Details" />
                <Table
                  style={{ backgroundColor: "white", padding: 20 }}
                  columns={columnsApi}
                  dataSource={[selectedRow]}
                  // pagination={pagination}
                  onChange={handleTableChange}
                />
              </PortletBody>
            </Portlet>
            {columnsData.pagedetails.map((detail) => (
              <PageDetails
                detail={detail}
                selectedRow={selectedRow}
                sdcid={columnsData.sdcid}
              />
            ))}
          </div>
        </div>
      )}

      {console.log(dataSource)}
    </>
  );
}

export default withRouter(Datatable);
