import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Member {
  id: string;
  name: string;
  role: string;
  category: "Staff" | "Board" | "Volunteer";
  email: string;
  phone: string;
  photoUrl: string;
  joinDate: string;
  status: "Active" | "Inactive";
  cpdPoints: number;
}

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link href={`/members/${member.id}`}>
      <Card className="group hover:border-accent transition-colors cursor-pointer p-4 bg-card">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-sm overflow-hidden bg-muted flex-shrink-0">
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-sm text-foreground truncate group-hover:text-accent transition-colors">
              {member.name}
            </h3>
            <p className="font-sans text-xs text-muted-foreground mt-0.5 truncate">
              {member.role}
            </p>
            <Badge
              variant="secondary"
              className="mt-2 text-xs font-sans font-normal"
            >
              {member.category}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}