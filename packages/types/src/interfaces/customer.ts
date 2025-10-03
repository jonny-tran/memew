import { Gender } from "../enums";

export interface Customer {
  CustomerID: string;
  Name: string;
  DayOfBirth: string | null;
  Gender: Gender | null;
  PhoneNumber: string;
  Address: string | null;
}
