import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Select, message, Spin } from "antd";
import redaxios from "redaxios";
import useSWR from "swr";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

function FSelect(props) {
  const [data, setData] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
  const parsed = queryString.parse(props.location.search);
  console.log("propsSelect", props);
  console.log("parsed", parsed);
//setHasMore to false set page 0 set data null on closing dropdown

  const handleScrollPosition = () => {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  };

  function onSearch(val) {
    setFilter(val);
    setPage(0);
    console.log("search:", val);
  }
  React.useEffect(() => {
    if (props === null) return;
    redaxios
      .get("http://localhost:8080/EuclideV2/api/getSelectOptions", {
        params: {
          dc: `com.euclide.sdc.${props.refsdcid}`,
          display: props.display,
          flux: parsed.fluxId,
          wizard: parsed.pagelistid,
          step: props.step,
          field: props.name,
          page: page,
          filter: filter,
        },
        withCredentials: true,
      })
      .then((response) => {
        page === 0
          ? setData(response.data.results)
          : setData([...data, ...response.data.results]);
        setHasMore(response.data.more);
        setLoading(false);
      });
    console.log("data", data);
  }, [props, page]);

  React.useEffect(() => {
    console.log("selectData", data);
    console.log(hasMore);
  }, [data]);

  return (
    <>
      {data && (
        <div>
          <label htmlFor={props.name}>{props.label}</label>
          <Field
            showSearch
            component={Select}
            name={props.name}
            placeholder={props.label}
            disabled={props.readonly}
            hidden={props.hidden}
            onSearch={onSearch}
            style={{ width: "100%" }}
            onPopupScroll={() => {
              

              console.log("window.innerHeight: ", window.innerHeight);
              console.log(
                "document.documentElement.scrollTop: ",
                document.documentElement.scrollTop
              );
              console.log(
                "document.scrollingElement.scrollHeight: ",
                window.innerHeight
              );
              console.log("hihihi:", page);
              if (
                hasMore !== false &&
                window.innerHeight + document.documentElement.scrollTop ===
                  document.scrollingElement.scrollHeight
              ) {
                setScrollPosition( window.pageYOffset);
                setPage(page + 1);
              }
            }}
          >
            {data.map((elem) => (
              <Select.Option key={elem.id} value={elem.name}>
                <div className="demo-infinite-container">{elem.name}</div>
              </Select.Option>
            ))}
          </Field>
          <p style={{ margin: 0 }}>{props.instructionalText}</p>
          <ErrorMessage
            name={props.name}
            render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
          />
        </div>
      )}
    </>
  );
}

export default withRouter(FSelect);
