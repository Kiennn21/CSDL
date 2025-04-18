// app/about/page.tsx
import React from "react";
import StudentPayments from "./studentPayment";
import StudentServices from "./studentService";
import GuestVisits from "./guestVisit";
import MonthlyServiceRevenue from "./monthly-service-revenue";
import RoomViolations from "./room-violation";
import VehicleViolations from "./vehicle-violation";

const Page = () => {
  return (
    <div className="bg-white text-black min-h-screen w-full">
      <p>BTL</p>
 <StudentPayments/>
 <StudentServices /> 
 <GuestVisits/>
 <MonthlyServiceRevenue/>
 <RoomViolations/>
 <VehicleViolations />
    </div>
  );
};

export default Page;
