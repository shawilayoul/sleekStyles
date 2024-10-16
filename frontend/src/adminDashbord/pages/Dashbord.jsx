import Products from "../components/PopularProducts";
import CustomerExpenses from "../components/CustomerExpenses";
import SalleSummary from "../components/SalleSummary";
import PurchaseSummary from "../components/PurchaseSummary";
import ExpenseSummary from "../components/ExpenseSummary";
import SallesDiscount from "../components/SallesDiscount";
import PenddingOrders from "../components/PenddingOrders";
const Dashbord = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-2">
      {/*products*/}
      <Products />
      {/*sale summery*/}
      <SalleSummary />

      {/*Purches summmary*/}
      <PurchaseSummary />
      {/*Expenses Summary*/}
      <ExpenseSummary />

      {/*customer and expenese*/}

      <CustomerExpenses />

      {/*Bues& Pendding orders*/}
      <PenddingOrders />
      {/*Salles & Discount*/}
      <SallesDiscount />
    </main>
  );
};

export default Dashbord;
