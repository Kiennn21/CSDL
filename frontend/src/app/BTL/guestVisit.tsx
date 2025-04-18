'use client'
import { Table, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

// Định nghĩa interface cho Guest Visit
interface GuestVisit {
  guest_name: string;
  visit_count: number;
  last_visit: string;
  guest_cmt: string;
  student_id: string;
  student_name: string;
  student_class: string;
  room_number: string;
}

const GuestVisits = () => {
  const [guestVisits, setGuestVisits] = useState<GuestVisit[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [startDate, setStartDate] = useState<any>(null); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [endDate, setEndDate] = useState<any>(null); 

  useEffect(() => {
    const fetchGuestVisits = async () => {
      setLoading(true);
      if (!startDate || !endDate) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/guest-visits?startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format("YYYY-MM-DD")}`,
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

        const data: GuestVisit[] = await response.json();
        setGuestVisits(data); 
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchGuestVisits();
  }, [startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const columns = [
    {
      title: "Guest Name",
      dataIndex: "guest_name",
      key: "guest_name",
    },
    {
      title: "Visit Count",
      dataIndex: "visit_count",
      key: "visit_count",
    },
    {
      title: "Last Visit",
      dataIndex: "last_visit",
      key: "last_visit",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"), // Định dạng ngày
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Class",
      dataIndex: "student_class",
      key: "student_class",
    },
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",
    },
  ];

  return (
    <div>
      <h1>Guest Visits</h1>
      <div>
        <DatePicker
          value={startDate}
          onChange={(value) => setStartDate(value)}
          style={{ marginRight: 20 }}
          placeholder="Start Date"
        />
        
        <DatePicker
          value={endDate}
          onChange={(value) => setEndDate(value)}
          style={{ marginRight: 20 }}
          placeholder="End Date"
        />
      </div>

      <Table
        dataSource={guestVisits}
        columns={columns}
        rowKey="guest_cmt" 
        pagination={{
          pageSize: 5, 
        }}
        size="small" 
      />
    </div>
  );
};

export default GuestVisits;
