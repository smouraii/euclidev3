import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import FolderList from "./FolderList";
import NewRequest from "./NewRequest";
import Efiles from "./Efiles";

const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/builder" component={Builder} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/newrequest" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} />
        <Route path="/folderlist" component={FolderList} />
        {/* <Route path="/newrequest" component={NewRequest}/> */}
        <Route path="/Efiles" component={Efiles}/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
