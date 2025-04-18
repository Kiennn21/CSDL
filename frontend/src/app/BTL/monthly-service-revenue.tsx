'use client'
import { Table } from "antd";
import React, { useEffect, useState } from "react";

// Định nghĩa interface cho Service Revenue
interface ServiceRevenue {
  total_revenue: number;
  service_id: string;
  service_name: string;
  month: number;
  year: number;
  usage_count: number;
}

const MonthlyServiceRevenue = () => {
  const [serviceRevenue, setServiceRevenue] = useState<ServiceRevenue[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceRevenue = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:5000/api/services/monthly-service-revenue`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: ServiceRevenue[] = await response.json();
        setServiceRevenue(data); 
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRevenue(); 
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Usage Count",
      dataIndex: "usage_count",
      key: "usage_count",
    },
    {
      title: "Total Revenue",
      dataIndex: "total_revenue",
      key: "total_revenue",
      render: (text: number) => `${text.toLocaleString()} VND`, 
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
  ];

  return (
    <div>
      <h1>Monthly Service Revenue</h1>

      <Table
        dataSource={serviceRevenue}
        columns={columns}
        rowKey="service_id" 
        pagination={{
          pageSize: 5,
        }}
        size="small" 
      />
    </div>
  );
};

export default MonthlyServiceRevenue;
