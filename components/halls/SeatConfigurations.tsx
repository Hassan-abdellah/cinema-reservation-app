import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Hall } from "@/db/schema";
import { Minus } from "lucide-react";
const SeatConfigurations = ({
  hall,
}: {
  hall: Hall & { cinema: { id: string; name: string } };
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{hall?.name}</CardTitle>

        <div>
          <span>Check the Empty Seat </span>
        </div>
      </CardHeader>
      <CardContent>
        {hall?.gridCols && hall?.gridRows ? (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-2">
              <Minus className="w-1/3" />
              <span>Screen</span>
              <Minus className="w-1/3" />
            </div>
            <ul className="flex items-center justify-center gap-2">
              {Array.from({ length: hall?.gridCols }).map((_, index) => (
                <li key={index} className="space-y-2">
                  {Array.from({ length: hall?.gridRows ?? 0 }).map((_, idx) => (
                    <Checkbox key={idx} className="cursor-pointer" />
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default SeatConfigurations;
