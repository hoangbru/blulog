import { maxValuePrice } from "@/constants/value";

export const prices = [
  "all",
  "0-10",
  "10-20",
  "20-40",
  "40-60",
  "60-80",
  "80-100",
  `${maxValuePrice}`,
];

export const sortOptions = [
  { value: "name", label: "Name, A to Z" },
  { value: "-name", label: "Name, Z to A" },
  { value: "price", label: "Price, low to high" },
  { value: "-price", label: "Price, high to low" },
  { value: "date", label: "Newest" },
];
