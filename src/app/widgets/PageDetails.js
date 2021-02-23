import React, { useState } from "react";
import { Table, Input, Button, Icon, DatePicker } from "antd";
import {
  PortletBody,
  Portlet,
  PortletHeader,
} from "../partials/content/Portlet";
import redaxios from "redaxios";

export default function PageDetails(props) {
  console.log("props detail", props);
  const [pagination, setPagination] = useState({});

  //Result Table
  const [columnsResultsApi, setColumnsResultsApi] = useState([]);
  const [dataResults, setDataResults] = useState([]);
  const [dataSourceResults, setDataSourceResults] = useState(null);
  const [columnsDataResults, setColumnsDataResults] = useState(null);

  // Sample Table
  const [columnsSampleApi, setColumnsSampleApi] = useState([]);
  const [dataSample, setDataSample] = useState(null);
  const [dataSourceSample, setDataSourceSample] = useState(null);
  const [columnsDataSample, setColumnsDataSample] = useState(null);

  React.useEffect(() => {
    if (
      props.detail !== null &&
      props.sdcid !== null &&
      props.selectedRow !== null
    )
      redaxios
        .get(
          `http://localhost:8080/EuclideV2/api/getList`,
          {
            params: {
              dc: `com.euclide.sdc.${props.detail.sdcid}`,
              masterdata: props.sdcid,
              masterdata_id: props.selectedRow.id,
            },
            withCredentials: true 
          },
         
        )
        .then((res) => setDataSample(res.data));
  }, [props.selectedRow.id]);

  React.useEffect(() => {
    console.log("DataSample", dataSample);
  }, [dataSample]);

  React.useEffect(() => {
    if (!dataSample) return;
    const mapDataSample = dataSample.data.map((datarow) => ({
      id: datarow.id,
      s_sampleid: datarow.s_sampleid,
      sampledesc: datarow.sampledesc,
      samplestatus: datarow.samplestatus,
      templateflag: datarow.templateflag,
    }));
    setDataSourceSample(mapDataSample);
    console.log("mapDataSample", mapDataSample);
    console.log("data", props.data);
  }, [dataSample]);

  React.useEffect(() => {
    if (!props.detail) return;

    const mapColumnsSample = props.detail.pagedetailscolumns.map(
      (detailColumn, index) => ({
        title: detailColumn.title,
        dataIndex: detailColumn.data,
        key: detailColumn.name,
      })
    );
    setColumnsSampleApi(mapColumnsSample);
    console.log("mapColumnsSample", mapColumnsSample);
  }, [props.detail]);

  //Data Results
  React.useEffect(() => {
    if (props.detail !== null && !dataSample) return;
    (async () => {
      const results = await Promise.all(
        dataSample.data.map(async (datarow) => {
          const res = await redaxios.get(
            `http://localhost:8080/EuclideV2/api/getResults`,
            {
                params: {
                  dc: `com.euclide.sdc.${props.detail.sdcid}`,
                  id:datarow.id,
                },
                withCredentials: true,
              }
          );
          return res.data;
        })
      );

      setDataResults(results);
    })();
  }, [dataSample]);

  React.useEffect(() => {
    console.log("DataResults", dataResults);
  }, [dataResults]);

  React.useEffect(() => {
    if (!dataResults) return;
    const mapDataResults = dataResults.map((datarow) => ({
      id: datarow[0].id,
      createdt: datarow[0].createdt,
      dataset: datarow[0].dataset,
      enteredtext: datarow[0].enteredtext,
      enteredunits: datarow[0].enteredunits,
      keyid1: datarow[0].keyid1,
      moddt: datarow[0].moddt,
      paramlistid: datarow[0].paramlistid,
      paramlistversionid: datarow[0].paramlistversionid,
      replicateid: datarow[0].replicateid,
      sdcid: datarow[0].sdcid,
      variantid: datarow[0].variantid,
    }));
    setDataSourceResults(mapDataResults);
    console.log("mapDataResults", mapDataResults);
    console.log("data", props.data);
  }, [dataResults]);

  React.useEffect(() => {
    if (!props.detail && props.detail.linkeddataset === true) return;
    const mapcolumnsResult = props.detail.datasetcolumns.map(
      (resultColumn) => ({
        title: resultColumn.title,
        dataIndex: resultColumn.data,
        key: resultColumn.name,
      })
    );
    setColumnsResultsApi(mapcolumnsResult);
    console.log("columnsResultsApi", mapcolumnsResult);
  }, [props.detail]);

  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination(pager);
  };

  return (
    <>
      <Portlet>
        <PortletBody fit={true}>
          <PortletHeader title={props.detail.sdcid} />
          <Table
            style={{ backgroundColor: "white" }}
            columns={columnsSampleApi}
            dataSource={dataSourceSample}
            // pagination={pagination}
          />
        </PortletBody>
      </Portlet>
      <Portlet>
        <PortletBody fit={true}>
          <PortletHeader title="Results" />
          <Table
            style={{ backgroundColor: "white" }}
            columns={columnsResultsApi}
            dataSource={dataSourceResults}
            // pagination={pagination}
            onChange={handleTableChange}
          />
        </PortletBody>
      </Portlet>
    </>
  );
}
