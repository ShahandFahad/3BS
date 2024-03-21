import AcUnitIcon from "@mui/icons-material/AcUnit";
import CurrentUserProfile from "./pages/CurrentUserProfile/CurrentUserProfile";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import NewProduct from "./pages/NewProduct/NewProduct";
import Register from "./pages/Register/Register";
import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import SignIn from "./pages/SignIn/SignIn";
import ExchangeProducts from "./pages/ExchangeProducts/ExchangeProducts";
import ExchangeProductDetail from "./pages/ExchangeProductDetail/ExchangeProductDetail";
import ExchangeWithProduct from "./pages/ExchangeWithProduct/ExchangeWithProduct";
import ChatBox from "./pages/ChatBox/ChatBox";
import { Routes, Route } from "react-router-dom";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import ProtectedRoutes from "./ProtectedRoutes";
import EditProduct from "./pages/EditProduct/EditProduct";
import Search from "./pages/Search/Search";
import EditExchangeProduct from "./pages/EditProduct/EditExchangeProduct";
import ExchangeWithProductDetails from "./pages/ExchangeWithProductDetails/ExchangeWithProductDetails";
import Analytics from "./pages/Analytics/Analytics";
import Awards from "./pages/Awards/Awards";
import Views from "./pages/Views/Views";
import Revenue from "./pages/Revenue/Revenue";
import AwardsPage from "./pages/Awards/Awards";
import Total from "./pages/Analytics/Total/Total";
import Available from "./pages/Analytics/Available/Available";
import Sold from "./pages/Analytics/Sold/Sold";
import Pending from "./pages/Analytics/Pending/Pending";
import AwardDetails from "./pages/Awards/AwardDetails/AwardDetails";
import Eligibility from "./pages/Awards/AwardDetails/Eligibility";
import ProfileView from "./pages/Views/ProfileView/ProfileView";
import TotalProductView from "./pages/Views/TotalProductView/TotalProductView";
import PaymentCard from "./components/PaymentCard/PaymentCard";
import Transactions from "./pages/Transactions/Transactions";
import Notifications from "./pages/Notifications/Notifications";
import Sell from "./pages/Sell/Sell";
import Rent from "./pages/Rent/Rent";
import BuyerRequest from "./pages/BuyerRequest/BuyerRequest";
import ListForDetail from "./pages/ListForDetail/ListForDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/relatedproduct" element={<RelatedProducts />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/currentuserprofile" element={<CurrentUserProfile />} />
          <Route path="/currentusersell" element={<Sell />} />
          <Route path="/rentproducts" element={<Rent />} />
          <Route
            path="/rentproductdetails/:productId"
            element={<ListForDetail />}
          />
          <Route path="/buyerrequestproducts" element={<BuyerRequest />} />
          <Route path="/addsellproduct" element={<NewProduct mode="sell" />} />
          <Route path="/editproduct/:productId" element={<EditProduct />} />
          <Route
            path="/editexchangeproduct/:productId"
            element={<EditExchangeProduct />}
          />
          <Route path="/search" element={<Search />} />
          <Route
            path="/addexchangeproduct"
            element={<NewProduct mode="exchange" />}
          />
          <Route path="/exchangeproducts" element={<ExchangeProducts />} />
          <Route
            path="/exchangeproductdetails/:productId"
            element={<ExchangeProductDetail />}
          />
          <Route
            path="/exchangewith/:productId"
            element={<ExchangeWithProduct />}
          />
          <Route
            path="/exchangewithproductdetails/:productId"
            element={<ExchangeWithProductDetails />}
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chatbox" element={<ChatBox />} />
          {/* analytics for working product */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/analytics/totalproducts" element={<Total />} />
          <Route path="/analytics/availableproducts" element={<Available />} />
          <Route path="/analytics/soldproducts" element={<Sold />} />
          <Route path="/analytics/pendingproducts" element={<Pending />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/awards/details" element={<AwardDetails />} />
          <Route path="/awards/eligibility" element={<Eligibility />} />
          <Route path="/views" element={<Views />} />
          <Route path="/views/profileviews" element={<ProfileView />} />
          <Route
            path="/views/totalproductviews"
            element={<TotalProductView />}
          />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
