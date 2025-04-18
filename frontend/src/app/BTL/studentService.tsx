'use client'
import { Table } from "antd";
import React, { useEffect, useState } from "react";

interface StudentService {
  total_price: number;
  student_id: string;
  student_name: string;
  service_name: string;
}

const StudentServices = () => {
  const [services, setServices] = useState<StudentService[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/student-services?startDate=2025-04-01&endDate=2025-04-30",
          {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: StudentService[] = await response.json();
        setServices(data); 
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false); 
      }
    };

    fetchServices(); 
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
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (text: number) => `${text.toLocaleString()} VND`,
    },
  ];

  return (
    <div>
      <h1>Student Services</h1>
      <Table
        dataSource={services}
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

export default StudentServices;
