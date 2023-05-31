"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Dropdown() {
  const [userLocation, setUserLocation] = useState("Hyderabad");

  const router = useRouter();

  useEffect(() => {
    router.push(`/${userLocation}`);
  }, [userLocation, router]);

  return (
    <Select value={userLocation} onValueChange={setUserLocation}>
      <SelectTrigger className="w-[180px] text-white border-none">
        <SelectValue aria-label={userLocation} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
        <SelectItem value="bangalore">Bengaluru</SelectItem>
        <SelectItem value="Mumbai">Mumbai</SelectItem>
        <SelectItem value="Delhi">Delhi</SelectItem>
      </SelectContent>
    </Select>
  );
}
