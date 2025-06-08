import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import DashboardPortfolioOverview from "pages/dashboard-portfolio-overview";
import AssetChainSelector from "pages/asset-chain-selector";
import AccountSettingsPreferences from "pages/account-settings-preferences";
import StrategyTemplatesLibrary from "pages/strategy-templates-library";
import VisualWorkflowBuilder from "pages/visual-workflow-builder";
import StrategyMonitoringAnalytics from "pages/strategy-monitoring-analytics";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <div className="pt-16">
          <RouterRoutes>
            <Route path="/" element={<DashboardPortfolioOverview />} />
            <Route path="/dashboard-portfolio-overview" element={<DashboardPortfolioOverview />} />
            <Route path="/asset-chain-selector" element={<AssetChainSelector />} />
            <Route path="/account-settings-preferences" element={<AccountSettingsPreferences />} />
            <Route path="/strategy-templates-library" element={<StrategyTemplatesLibrary />} />
            <Route path="/visual-workflow-builder" element={<VisualWorkflowBuilder />} />
            <Route path="/strategy-monitoring-analytics" element={<StrategyMonitoringAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;