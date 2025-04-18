'use client'
import { Table } from "antd";
import React, { useEffect, useState } from "react";

interface Payment {
  student_id: string;
  name: string;
  room_number: string;
  total_service_fee: number;
  room_fee: number;
  total_payment: number;
}

const StudentPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchPayments = async () => {
      try {
  
        const response = await fetch("http://localhost:5000/api/student-payments", {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
console.log('response',response);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: Payment[] = await response.json();
        setPayments(data); 
      } catch (error) {
        // Nếu có lỗi, cập nhật trạng thái lỗi
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false); 
      }
    };

    fetchPayments(); 
  }, []); 

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns = [
    {
      title: "Student ID",
      dataIndex: "student_id",
      key: "student_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      title: "Total Service Fee",
      dataIndex: "total_service_fee",
      key: "total_service_fee",
      render: (text: number) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Room Fee",
      dataIndex: "room_fee",
      key: "room_fee",
      render: (text: number) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Total Payment",
      dataIndex: "total_payment",
      key: "total_payment",
      render: (text: number) => `${text.toLocaleString()} VND`,
    },
  ];
  

  return (
    <div>
      <h1>Student Payments</h1>
      <Table
        dataSource={payments}
        columns={columns}
        rowKey="student_id"
        pagination={{
          pageSize: 5,
        }}
        size="small" 
      />
    </div>
  );
};

export default StudentPayments;
