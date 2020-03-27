import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { metronic } from "../../../_metronic";
import QuickStatsChart from "../../widgets/QuickStatsChart";
import OrderStatisticsChart from "../../widgets/OrderStatisticsChart";
import MyResponsivePie from "../../widgets/PieChart";
import pieData from "./data/pieData.json";
import MyResponsiveBar from "../../widgets/BarChart";
import barData from "./data/barData.json";
import DatePickerComp from "../../widgets/DatePicker";

import OrdersWidget from "../../widgets/OrdersWidget";
import SalesBarChart from "../../widgets/SalesBarChart";
import DownloadFiles from "../../widgets/DownloadFiles";
import NewUsers from "../../widgets/NewUsers";
import LatestUpdates from "../../widgets/LatestUpdates";
import BestSellers from "../../widgets/BestSellers";
import RecentActivities from "../../widgets/RecentActivities";
import PortletHeaderDropdown from "../../partials/content/CustomDropdowns/PortletHeaderDropdown";

export default function Dashboard() {
  const { brandColor, dangerColor, successColor, primaryColor } = useSelector(
    state => ({
      brandColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.brand"
      ),
      dangerColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.danger"
      ),
      successColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.success"
      ),
      primaryColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.primary"
      )
    })
  );

  const chartOptions = useMemo(
    () => ({
      chart1: {
        data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
        color: brandColor,
        border: 3
      },

      chart2: {
        data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
        color: dangerColor,
        border: 3
      },

      chart3: {
        data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
        color: successColor,
        border: 3
      },

      chart4: {
        data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
        color: primaryColor,
        border: 3
      }
    }),
    [brandColor, dangerColor, primaryColor, successColor]
  );

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-12">
          <div className="row row-full-height">
            <div className="col-sm-12 col-md-12 col-lg-4">
              <Portlet className="kt-portlet--height-fluid">
                <div className="kt-widget1">
                  <div className="kt-widget1__item ng-star-inserted">
                    <div className="kt-widget1__info">
                      <h3 className="kt-widget1__title">Total Requests Submitted</h3>
                      <span className="kt-widget1__desc">Submitted thru Euclide</span>
                    </div>
                    <span className="kt-widget1__number kt-font-danger">450</span>
                  </div>
                </div>
              </Portlet>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
            <Portlet className="kt-portlet--height-fluid">
              <div className="kt-widget1">
                <div className="kt-widget1__item ng-star-inserted">
                  <div className="kt-widget1__info">
                    <h3 className="kt-widget1__title">Requests In Proccessing</h3>
                    <span className="kt-widget1__desc">Multiple Status</span>
                  </div>
                  <span className="kt-widget1__number kt-font-warning">150</span>
                </div>
              </div>
              </Portlet>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
            <Portlet className="kt-portlet--height-fluid">
              <div className="kt-widget1">
                <div className="kt-widget1__item ng-star-inserted">
                  <div className="kt-widget1__info">
                    <h3 className="kt-widget1__title">Requests Completed</h3>
                    <span className="kt-widget1__desc">Lifetime Requests Completed</span>
                  </div>
                  <span className="kt-widget1__number kt-font-success">300</span>
                </div>
              </div>
              </Portlet>
            </div>
          </div>



















          {/* <div className="row row-full-height">
            <div className="col-sm-12 col-md-12 col-lg-4">
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-dark">
                <PortletHeader
                  title="Total Requests Submitted" />
                  <PortletBody fluid={true}>
                  <div className="kt-widget26">
                    <div className="kt-widget26__content">
                      <span className="kt-widget26__number kt-font-danger">{450}</span>
                    </div>
                  </div>
                  </PortletBody>
              </Portlet>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-dark">
                <PortletHeader
                  title="Requests In Proccessing" />
                  <PortletBody fluid={true}>
                  <div className="kt-widget26">
                    <div className="kt-widget26__content">
                      <span className="kt-widget26__number kt-font-warning">{150}</span>
                    </div>
                  </div>
                  </PortletBody>
              </Portlet>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-dark">
                <PortletHeader
                  title="Requests Completed" />
                  <PortletBody fluid={true}>
                  <div className="kt-widget26">
                    <div className="kt-widget26__content">
                      <span className="kt-widget26__number kt-font-success" >{350}</span>
                    </div>
                  </div>
                  </PortletBody>
              </Portlet>
            </div>
          </div> */}
        </div>



        <div className="col-xl-12">
          <div className="row row-full-height">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-dark" fluidHeight={true}>
                <PortletHeader
                  title="Request per State per Month"
                // toolbar={
                //   <PortletHeaderToolbar>
                //     <PortletHeaderDropdown />
                //   </PortletHeaderToolbar>
                // }
                />

                <PortletBody>
                  <MyResponsiveBar
                    data={barData}
                  />
                </PortletBody>
              </Portlet>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-dark" fluidHeight={true}>
                <PortletHeader
                  title="Sample per Request"
                // toolbar={
                //   <PortletHeaderToolbar>
                //     <PortletHeaderDropdown />
                //   </PortletHeaderToolbar>
                // }
                />

                <PortletBody>
                  <MyResponsivePie
                    data={pieData}
                  />
                </PortletBody>
              </Portlet>
            </div>
          </div>
        </div>

      </div>

    </>
  );
}