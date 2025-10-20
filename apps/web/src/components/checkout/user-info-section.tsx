import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface UserInfoSectionProps {
  userInfo: UserInfo;
}

export default function UserInfoSection({ userInfo }: UserInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin người đặt hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Họ và tên</Label>
            <Input
              id="name"
              value={userInfo.name}
              readOnly
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              value={userInfo.phone}
              readOnly
              className="bg-gray-50"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={userInfo.email}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div>
          <Label htmlFor="address">Địa chỉ giao hàng</Label>
          <Input
            id="address"
            value={userInfo.address}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </CardContent>
    </Card>
  );
}
