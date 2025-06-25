"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var Loader_1 = require("common/Loader");
var base_1 = require("common/base");
var errors_1 = require("utils/errors");
var NotFound_1 = require("common/NotFound");
var CallToActionFolder_1 = require("common/CallToAction/CallToActionFolder");
var FanPageBlock_1 = require("common/FanPageBlock");
var selectors_1 = require("common/routing/selectors");
var fetchBox_1 = require("utils/fetchBox");
var laborRights_1 = require("actions/laborRights");
var useEntry_1 = require("./useEntry");
var Body_1 = require("./Body");
var Footer_1 = require("./Footer");
var Helmet_1 = require("./Helmet");
var LaborRightsSingle_module_css_1 = require("./LaborRightsSingle.module.css");
var entryIdSelector = function (params) { return params.id; };
var LaborRightsSingle = function () {
    var params = (0, react_router_dom_1.useParams)();
    var entryId = params.id;
    var dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(function () {
        dispatch((0, laborRights_1.queryMenuIfUnfetched)());
    }, [dispatch]);
    (0, react_1.useEffect)(function () {
        dispatch((0, laborRights_1.queryEntryIfUnfetched)(entryId));
    }, [dispatch, entryId]);
    var entryBox = (0, useEntry_1.default)(entryId);
    var _a = (0, useEntry_1.useNeighborEntry)(entryId), prevEntry = _a[0], nextEntry = _a[1];
    return (<base_1.Section>
      {((0, fetchBox_1.isFetching)(entryBox) || (0, fetchBox_1.isUnfetched)(entryBox)) && <Loader_1.default />}
      {(0, fetchBox_1.isError)(entryBox) && (0, errors_1.isUiNotFoundError)(entryBox.error) && <NotFound_1.default />}
      {(0, fetchBox_1.isFetched)(entryBox) && (<react_1.Fragment>
          <Helmet_1.default entryId={entryId} seoTitle={entryBox.data.seoTitle || entryBox.data.title} seoDescription={entryBox.data.seoDescription || entryBox.data.description} coverUrl={entryBox.data.coverUrl}/>
          <div>
            <Body_1.default title={entryBox.data.title} seoText={entryBox.data.seoText} description={entryBox.data.description} content={entryBox.data.content}/>
            <FanPageBlock_1.default className={LaborRightsSingle_module_css_1.default.fanPageBlock}/>
            {entryBox.data.nPublicPages < 0 && (<base_1.Section marginTop>
                <CallToActionFolder_1.default />
              </base_1.Section>)}
            <Footer_1.default id={entryId} prev={prevEntry} next={nextEntry}/>
          </div>
        </react_1.Fragment>)}
    </base_1.Section>);
};
LaborRightsSingle.fetchData = function (_a) {
    var dispatch = _a.store.dispatch, props = __rest(_a, ["store"]);
    var params = (0, selectors_1.paramsSelector)(props);
    var entryId = entryIdSelector(params);
    return Promise.all([
        dispatch((0, laborRights_1.queryMenuIfUnfetched)()),
        dispatch((0, laborRights_1.queryEntryIfUnfetched)(entryId)),
    ]);
};
exports.default = LaborRightsSingle;
