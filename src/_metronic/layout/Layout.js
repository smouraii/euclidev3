import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Header from "./header/Header";
import SubHeader from "./sub-header/SubHeader";
import { withRouter } from "react-router-dom";
import HeaderMobile from "./header/HeaderMobile";
import AsideLeft from "./aside/AsideLeft";
import Footer from "./footer/Footer";
import ScrollTop from "../../app/partials/layout/ScrollTop";
// import StickyToolbar from "../../app/partials/layout/StickyToolbar";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import KtContent from "./KtContent";
import QuickPanel from "../../app/partials/layout/QuickPanel";
import "./assets/Base.scss";
import redaxios from "redaxios";

const htmlClassService = new HTMLClassService();

function Layout({
  children,
  asideDisplay,
  subheaderDisplay,
  selfLayout,
  layoutConfig,
}) {
  const [customMenuConfig, setcustomMenuConfig] = useState(null);

  useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/91f074c8-b503-406f-94aa-b934a2119c2f")
      .then((res) => {
        const mapData = res.data.data.map((datarow) => ({
          title: datarow.fluxname,
          root: true,
          alignement: "left",
          toggle: "click",
          page: datarow.fluxid,
          submenu: datarow.pagelists
            .map((page) => ({
              title: page.pagelisttitle,
              page: `folderlist?pagelistid=${page.pagelistid}&fluxId=${datarow.fluxid}`,
            }))
            .concat(
              datarow.fluxwizard.map((flux) => ({
                title: flux.name,
                page: `newrequest?pagelistid=${flux.id}&fluxId=${datarow.fluxid}`,
              }))
            ),
        }));
        const extraMenuItems = [ {
          title: "Euclide",
          root: true,
          alignment: "left",
          toggle: "click",
          page: "builder",
          submenu: [
            {
              title: "Lims",
              icon: "flaticon2-expand",
              page: "Lims"
            },
            {
              title: "Mail Server",
              icon: "flaticon2-envelope",
              page: "MailServer"
            },
            {
              title: "DB Configuration",
              icon: "flaticon-coins",
              page: "DB-Configuration"
            },
            {
              title: "Security Roles",
              icon: "flaticon-lock",
              page: "Security-Roles"
            },
            {
              title: "Users Configuration",
              icon: "flaticon-users",
              page: "User-Configuration"
            },
            {
              title: "Audit Configuration",
              icon: "flaticon-visible",
              page: "Audit-Configuration"
            },
            {
              title: "eFiles Configuration",
              icon: "flaticon-upload",
              page: "eFiles-Configuration"
            }
          ]
        },
        {
          title: "Issue Admin",
          root: true,
          alignment: "left",
          toggle: "click",
          page: "builder",
          submenu: [
            {
              title: "Bug report",
              page: "BugReport"
            },
            {
              title: "Error Log",
              page: "ErrorLog"
            },
            {
              title: "Audit Log",
              page: "AuditLog"
            },
          ]
        },]
        setcustomMenuConfig({
          ...MenuConfig, header:{...MenuConfig.header,items:[...MenuConfig.header.items,...mapData,...extraMenuItems]}
        });
      });
  }, []);
console.log(MenuConfig)
  htmlClassService.setConfig(layoutConfig);
  // scroll to top after location changes
  window.scrollTo(0, 0);

  const contentCssClasses = htmlClassService.classes.content.join(" ");
  const contentContainerCssClasses = htmlClassService.classes.content_container.join(
    " "
  );
  return !customMenuConfig ? (
    <div>hhhhhhhhh</div>
  ) : selfLayout !== "blank" ? (
    <LayoutInitializer
      styles={[]}
      menuConfig={customMenuConfig}
      layoutConfig={LayoutConfig}
      htmlClassService={htmlClassService}
    >
      {/* <!-- begin:: Header Mobile --> */}
      <HeaderMobile />
      {/* <!-- end:: Header Mobile --> */}

      <div className="kt-grid kt-grid--hor kt-grid--root">
        {/* <!-- begin::Body --> */}
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
          <div
            className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
            id="kt_wrapper"
          >
            <Header />
            {/* <!-- end:: Header --> */}
            <div
              className="kt-body kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch"
              id="kt_body"
            >
              {/* <!-- begin:: Aside Left --> */}
              {asideDisplay && (
                <>
                  <div
                    className={`kt-container ${contentContainerCssClasses} kt-container--fit kt-grid kt-grid--ver`}
                  >
                    <AsideLeft />
                    <div
                      className="kt-content kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
                      id="kt_content"
                    >
                      <KtContent>{children}</KtContent>
                    </div>
                  </div>
                </>
              )}
              {!asideDisplay && (
                <>
                  {/* <!-- begin:: Content --> */}
                  <div
                    id="kt_content"
                    className={`kt-content ${contentCssClasses} kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor`}
                  >
                    {/* <!-- begin:: Content Head --> */}
                    {subheaderDisplay && <SubHeader />}
                    {/* <!-- end:: Content Head --> */}

                    {/* <!-- begin:: Content Body --> */}
                    <KtContent>{children}</KtContent>
                    {/*<!-- end:: Content Body -->*/}
                  </div>
                  {/* <!-- end:: Content --> */}
                </>
              )}

              {/* <!-- end:: Aside Left --> */}
            </div>
            <Footer />
          </div>
        </div>

        {/* <!-- end:: Body --> */}
      </div>
      <QuickPanel />
      <ScrollTop />
      {/* <StickyToolbar /> */}
    </LayoutInitializer>
  ) : (
    // BLANK LAYOUT
    <div className="kt-grid kt-grid--ver kt-grid--root kt-page">
      <KtContent>{children}</KtContent>
    </div>
  );
}

const mapStateToProps = ({ builder: { layoutConfig } }) => ({
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  asideDisplay: objectPath.get(layoutConfig, "aside.self.display"),
  subheaderDisplay: objectPath.get(layoutConfig, "subheader.display"),
});

export default withRouter(connect(mapStateToProps)(Layout));
