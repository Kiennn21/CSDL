'use client'
import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";

interface RoomViolation {
  room_number: string;
  student_count: number;
  max_occupancy: number;
  over_capacity: boolean;
}

const RoomViolations = () => {
  const [roomViolations, setRoomViolations] = useState<RoomViolation[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  // Dùng useEffect để gọi API khi component mount
  useEffect(() => {
    const fetchRoomViolations = async () => {
      setLoading(true);
      try {
        // Gọi API để lấy dữ liệu
        const response = await fetch("http://localhost:5000/api/constraints/room-violations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: RoomViolation[] = await response.json();
        setRoomViolations(data); 
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomViolations(); 
  }, []); 

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 
  const columns = [
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      title: "Student Count",
      dataIndex: "student_count",
      key: "student_count",
    },
    {
      title: "Max Occupancy",
      dataIndex: "max_occupancy",
      key: "max_occupancy",
    },
    {
      title: "Over Capacity",
      dataIndex: "over_capacity",
      key: "over_capacity",
      render: (overCapacity: boolean) => (
        <Tag color={overCapacity ? "red" : "green"}>{overCapacity ? "Yes" : "No"}</Tag>
      ),
    },
  ];

  return (
    <div>
      <h1>Room Violations</h1>
      <Table
        dataSource={roomViolations}
        columns={columns}
        rowKey="room_number"
        pagination={{
          pageSize: 5, 
        }}
        size="small" 
      />
    </div>
  );
};

export default RoomViolations;
