'use client'
import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";

interface VehicleViolation {
  _id: string;
  total_vehicles: number;
  student_id: string;
  name: string;
  class: string;
}

const VehicleViolations = () => {
  const [vehicleViolations, setVehicleViolations] = useState<VehicleViolation[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchVehicleViolations = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/constraints/vehicle-violations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: VehicleViolation[] = await response.json();
        setVehicleViolations(data); 
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleViolations(); 
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Total Vehicles",
      dataIndex: "total_vehicles",
      key: "total_vehicles",
      render: (text: number) => <Tag color="blue">{text}</Tag>,
    },
  ];

  return (
    <div>
      <h1>Vehicle Violations</h1>
      <Table
        dataSource={vehicleViolations}
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

export default VehicleViolations;
