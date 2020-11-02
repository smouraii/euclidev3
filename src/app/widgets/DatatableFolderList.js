import React, { useRef, useState } from "react";
import { Table, Input, Button, Icon, DatePicker } from "antd";
import reqwest from "reqwest";
import { useLocation, withRouter } from "react-router-dom";
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

 function Datatable(props) {
  const [columnsApi, setColumnsApi] = useState([]);
  const [columnsData, setColumsData] = useState(null);
  const [data, setData] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [columnsResultsApi, setColumnsResultsApi] = useState([]);
  const [columnsData1, setColumsData1] = useState(null);
  const [data1, setData1] = useState(null);
  const [dataSource1, setDataSource1] = useState(null);  
  const [columnsApi1, setColumnsApi1] = useState([]);
  const [columnsData2, setColumsData2] = useState(null);
  const [data2, setData2] = useState(null);
  const [dataSource2, setDataSource2] = useState(null);



  // API for Columns generation
  React.useEffect(() => {
    const parsed = queryString.parse(props.location.search);
    redaxios
    // .get(`http://localhost:8080/EuclideV2/api/getPageList?pageListid=${parsed.pagelistid}&fluxId=${parsed.fluxId}`)
      .get("https://run.mocky.io/v3/86b418dc-085b-415d-8c2d-bee469ac5b82")
      .then((res) => setColumsData(res.data));
      console.log(parsed);
      console.log("props",props);
  }, []);


  //API for Data in Datatable
  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/12b1c471-7531-48bc-8654-e7e3d4016a99")
      .then((res) => setData(res.data));
  }, []);

  React.useEffect(() => {
    if (!userInfo) return;
    console.log(userInfo, "userinfo");
  }, [userInfo]);

  const handleChangeId = (val) => {
    setUserInfo(val);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination(pager);
  };

  // React.useEffect(() => {
  //   redaxios
  //     .get("https://run.mocky.io/v3/86b418dc-085b-415d-8c2d-bee469ac5b82")
  //     .then((res) => setColumsData(res.data));
  // }, []);

  // React.useEffect(() => {
  //   setLoading(true);
  //   redaxios
  //     .get("https://run.mocky.io/v3/0c67f526-ea93-4e06-b4e4-71f4da3c5917")
  //     .then((res) => setData(res.data));
  // }, []);
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
  const columnAttachement = [{
    title:"Attachement",
    dataindex:"test",
    key:"test",
  }
  ]

  //map data in columns
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
      attachments:datarow.attachments,
    }));
    setDataSource(mapData);
  }, [data]);

  //map columns for generating columns and search and sort and redirect to details
  React.useEffect(() => {
    if (!columnsData) return;
    const mapColumns = columnsData.columns.map((column, index) => ({
      title: column.title,
      dataIndex: column.data,
      key: column.name,
      ...getColumnSearchProps(column.data),
      sorter: (a, b) =>
        a instanceof String || null
          ? a.userInfo.localeCompare(b.userInfo)
          : a.userInfo - b.userInfo,
      render: (id, val) =>
        index === 0 && !userInfo ? (
          <Button type="link" onClick={() => handleChangeId(val)}>
            {id}
          </Button>
        ) : (
          id
        ),
    }));
    setColumnsApi(mapColumns);
    console.log("userinfo",userInfo)
    console.log("mapColumns", mapColumns);
  }, [columnsData, userInfo]);

 

  return (
    <>
      <QueryBuilder data={data} />
     {!userInfo&& <Table
        style={{ backgroundColor: "white" }}
        columns={columnsApi}
        dataSource={dataSource}
      />}
      {userInfo &&  <div className="row row-no-padding row-col-separator-x1">
          <div className="col-xl-12">
            <Portlet>
              <PortletBody fit={true}>
                <PortletHeader title="Details" />
                <Table
                  style={{ backgroundColor: "white", padding: 20 }}
                  columns={columnsApi}
                  dataSource={[userInfo]}
                  // pagination={pagination}
                  onChange={handleTableChange}
                />
              </PortletBody>
            </Portlet>
            <Portlet>
              <PortletBody fit={true}>
                <PortletHeader title="Sample" />
                <Table
                  style={{ backgroundColor: "white" }}
                  columns={columnsApi}
                  dataSource={[userInfo]}
                  // pagination={pagination}
                  onChange={handleTableChange}
                />
              </PortletBody>
            </Portlet>
            <Portlet>
              <PortletBody fit={true}>
              <PortletHeader title="Results" />
                <Table
                  style={{ backgroundColor: "white" }}
                  columns={columnsApi}
                  dataSource={[userInfo]}
                  // pagination={pagination}
                  onChange={handleTableChange}
                />
              </PortletBody>

              {console.log(data)}
            </Portlet>
  </div>
  </div>}

      {console.log(dataSource)}
    </>
  );
 
}

export default withRouter(Datatable);